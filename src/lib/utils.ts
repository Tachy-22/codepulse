import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

// Cookie and Session Management
const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  expires: 1,
  path: "/",
};

// Auth Token Management
const getAuthToken = () => {
  try {
    let token = Cookies.get("token");
    if (!token) {
      token = sessionStorage.getItem("token") || undefined;
    }
    if (!token) return undefined;
    if (token.split(".").length !== 3) {
      removeAuthToken();
      return undefined;
    }
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return undefined;
  }
};

const setAuthToken = (token: string) => {
  Cookies.set("token", token, cookieOptions);
  sessionStorage.setItem("token", token);
};

const removeAuthToken = () => {
  Cookies.remove("token", { path: "/" });
  sessionStorage.removeItem("token");
};

// User ID Management
const getUserId = () => {
  try {
    let userId = Cookies.get("userId");
    if (!userId) {
      userId = sessionStorage.getItem("userId") || undefined;
    }
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return undefined;
  }
};

const setUserId = (userId: string) => {
  Cookies.set("userId", userId, cookieOptions);
  sessionStorage.setItem("userId", userId);
};

const removeUserId = () => {
  Cookies.remove("userId", { path: "/" });
  sessionStorage.removeItem("userId");
};

// Tailwind Utilities
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const getErrorMessage = (error: string) => {
  switch (error) {
    case "Firebase: Error (auth/email-already-in-use).":
      return "This email is already in use. Please try logging in instead.";
    case "auth/email-already-in-use":
      return "This email is already in use. Please try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/operation-not-allowed":
      return "Sign-up is currently disabled. Please try again later.";
    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger password.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    default:
      return "Something went wrong. Please try again.";
  }
};

// Helper function to get the CSS class based on validation state
const getClassForCriteria = (isValid: boolean) => {
  return isValid
    ? "text-green-500 dark:text-green-400 flex items-center"
    : "text-gray-500 dark:text-gray-400 flex items-center";
};

export {
  cn,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserId,
  setUserId,
  removeUserId,
  getClassForCriteria,
  getErrorMessage,
};
