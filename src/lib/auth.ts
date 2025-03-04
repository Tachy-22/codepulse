// lib/auth.ts
import { createUser, getUserByEmail } from "@/actions/firebase/users";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NextRequest } from "next/server";
import { auth } from "./firebase";
import Cookies from "js-cookie";
import { fetchDocument } from "@/actions/firebase/fetchDocument";

export function verifyToken(token: string): boolean {
  // Replace with your actual token verification logic
  return token === "valid-token"; // Example
}

export function getUserRoleFromToken(token: string): string {
  // Replace with your actual role extraction logic
  return token === "admin-token" ? "admin" : "user"; // Example
}

export function authenticate(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token || !verifyToken(token)) {
    return { isAuthenticated: false, role: null };
  }

  const role = getUserRoleFromToken(token);
  return { isAuthenticated: true, role };
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Get token for cookie
    const token = await user.getIdToken();
    
    // Check if user already exists with this ID
    const existingUser = await fetchDocument("users", user.uid);
    
    // If no user document exists with this ID, check if email exists with different provider
    if (!existingUser && user.email) {
      // Look for a user with this email
      const existingEmailUser = await getUserByEmail(user.email);
      
      if (existingEmailUser) {
        // User exists with this email but different provider
        // Create a new user document for this Google sign-in
        const userResult = await createUser({
          id: user.uid,
          email: user.email,
          name: user.displayName || "Google User",
          provider: "GOOGLE",
        });
        
        if (!userResult.success) {
          return { success: false, error: userResult.error };
        }
      } else {
        // No user with this email exists, create new user
        const userResult = await createUser({
          id: user.uid,
          email: user.email,
          name: user.displayName || "Google User",
          provider: "GOOGLE",
        });
        
        if (!userResult.success) {
          return { success: false, error: userResult.error };
        }
      }
    }
    
    // Set cookies for authentication
    Cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: 30, // 30 days
    });

    Cookies.set("userId", user.uid, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: 30, // 30 days
    });

    return { success: true, userId: user.uid };
  } catch (error: unknown) {
    console.error("Google sign in error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to sign in with Google";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

