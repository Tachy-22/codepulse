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

export {
  cn,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserId,
  setUserId,
  removeUserId,
};

export const snippetTitles = [
  "nextjs-firebase-auth",
  "nextjs-stripe-checkout",
  "nextjs-zustand-store",
  "nextjs-react-query",
  "firebase-crud-operations",
  "nextjs-protected-routes",
  "nextjs-middleware-auth",
  "firebase-storage-upload",
  "nextjs-form-validation",
  "stripe-subscription-setup",
  "nextjs-api-routes",
  "firebase-real-time-db",
  "nextjs-seo-setup",
  "auth-context-provider",
  "stripe-webhook-handler",
  "nextjs-image-optimization",
  "firebase-social-auth",
  "nextjs-error-boundary",
  "custom-auth-hooks",
  "stripe-payment-intent",
  "nextjs-typescript-setup",
  "firebase-cloud-functions",
  "nextjs-dynamic-imports",
  "state-management-context",
  "stripe-customer-portal",
  "nextjs-server-actions",
  "firebase-analytics-setup",
  "nextjs-route-handlers",
  "authentication-flow",
  "stripe-elements-ui",
  "nextjs-data-fetching",
  "firebase-security-rules",
  "nextjs-loading-states",
  "redux-toolkit-setup",
  "stripe-product-catalog",
  "nextjs-error-handling",
  "firebase-messaging",
  "nextjs-infinite-scroll",
  "auth-middleware",
  "payment-processing",
];