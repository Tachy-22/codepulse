"use server";

import { auth } from "@/lib/firebase";
import { cookies } from "next/headers";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
} from "firebase/auth";

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    const cookieStore =  cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    const userId = userCredential.user.uid;

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
    const token = await userCredential.user.getIdToken();

    const cookieStore = await cookies();
    cookieStore.set("admin-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return { success: true, token }; // Added token to return statement
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
