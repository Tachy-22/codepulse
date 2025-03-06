"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { Mail, Loader } from "lucide-react";
import { signIn } from "@/actions/firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { fetchDocument } from "@/actions/firebase/fetchDocument";
import { createUser, getUserByEmail } from "@/actions/firebase/users";

import Link from "next/link";
import { Input, addToast } from "@heroui/react";
import { signInWithGoogle } from "@/lib/auth";
import { PasswordInput } from "../ui/PasswordInput";
import { getErrorMessage } from "@/lib/utils";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn(data.email, data.password, data.rememberMe);
      if (result.success) {
        // Check if user exists in the collection
        const userDoc = await fetchDocument("users", result?.userId as string);
        
        // If user doesn't exist by ID, check by email
        if (!userDoc) {
          // Check if this email exists but with different provider
          const existingEmailUser = await getUserByEmail(data.email);
          
          if (existingEmailUser) {
            // User exists with different auth method - create a new user record
            await createUser({
              id: result.userId as string,
              email: data.email,
              name: data.email.split("@")[0], // Basic name from email
              provider: "EMAIL",
            });
          } else {
            // No user with this email exists, create new user
            await createUser({
              id: result.userId as string,
              email: data.email,
              name: data.email.split("@")[0], // Basic name from email
              provider: "EMAIL",
            });
          }
        }
        
        addToast({
          title: "Login successful",
          description: "You have successfully logged in",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
        window.location.href = "/products";
      } else {
        setError(getErrorMessage(result.error as string));
        addToast({
          title: "Login failed",
          description: getErrorMessage(result.error as string),
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
      addToast({
        title: "Login error",
        description: "An unexpected error occurred during login",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      });
    } finally {
      setIsLoading(false);
    }
  };

   const handleGoogleSignIn = async () => {
     setError("");
     setIsGoogleLoading(true);
     try {
       const result = await signInWithGoogle();
       if (result.success) {
         addToast({
           title: "Google sign in successful",
           description: "You have been signed in with Google",
           promise: new Promise((resolve) => setTimeout(resolve, 3000)),
         });
         // Immediately redirect to products page instead of login
         window.location.href = "/products";
       } else {
         setError(result.error || "Something went wrong");
         addToast({
           title: "Google sign in failed",
           description: result.error || "Something went wrong with Google sign in",
           promise: new Promise((resolve) => setTimeout(resolve, 3000)),
         });
       }
     } catch (error) {
       setError("Failed to sign in with Google");
       addToast({
         title: "Google sign in failed",
         description: "Failed to sign in with Google",
         promise: new Promise((resolve) => setTimeout(resolve, 3000)),
       });
       console.error(error);
     } finally {
       setIsGoogleLoading(false);
     }
   };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-950 p-8 rounded-lg shadow-sm d dark:border-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            New here?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-500"
            >
              Create an account
            </Link>
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-[0.5rem] text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <Loader className="h-5 w-5 animate-spin text-blue-600" />
          ) : (
            <FcGoogle size={24} />
          )}
          {isGoogleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-black rounded text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5">
            <Input
              startContent={<Mail className="h-5 w-5 text-gray-400" />}
              label="Email address"
              variant="bordered"
              {...register("email")}
              type="email"
              placeholder="Email address"
              errorMessage={errors.email?.message as string}
            />

            {/* Replace the Input component with PasswordInput */}
            <PasswordInput
              registration={register("password")}
              error={errors.password?.message}
              label="Password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register("rememberMe")}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[0.5rem] shadow-sm text-sm font-medium text-white bg-blue-600 ho  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
