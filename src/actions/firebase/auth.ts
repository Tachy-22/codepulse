"use server";

import { auth } from "@/lib/firebase";
import { cookies } from "next/headers";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createUser } from "./users";

const googleProvider = new GoogleAuthProvider();

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days if remember me, else 1 day
    });

    const userId = userCredential.user.uid;
    
    // Store the userId in a separate cookie
    cookieStore.set("userId", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    });

    return {
      success: true,
      userId,
      token,
    };
  } catch (error: unknown) {
    const firebaseError = error as import("firebase/app").FirebaseError;
    return {
      success: false,
      error: firebaseError.message || "Invalid credentials",
    };
  }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    
    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days for remember me
    });

    return {
      success: true,
      userId: result.user.uid,
      token,
    };
  } catch (error: unknown) {
    const firebaseError = error as import("firebase/app").FirebaseError;
    return { success: false, error: firebaseError.message };
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    const cookieStore = cookies();
    cookieStore.delete("token");
    cookieStore.delete("userId");


    console.log("signing out");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    
    // Create user document in database
    const userResult = await createUser({
      id: userCredential.user.uid,
      email: email,
      name: name,
    });

    if (!userResult.success) {
      throw new Error(userResult.error);
    }

    const token = await userCredential.user.getIdToken();

    const cookieStore = await cookies();
    cookieStore.set("admin-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return { success: true, token, userId: userCredential.user.uid };
  } catch (error: unknown) {
    const firebaseError = error as import("firebase/app").FirebaseError;
    return { success: false, error: firebaseError.message };
  }
}

export async function forgotPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as import("firebase/app").FirebaseError;
    return { success: false, error: firebaseError.message };
  }
}

export async function resetPassword(oobCode: string, newPassword: string) {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { success: true };
  } catch (error: unknown) {
    const firebaseError = error as import("firebase/app").FirebaseError;
    return { success: false, error: firebaseError.message };
  }
}
