"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { signIn, signInWithGoogle } from "@/actions/firebase/auth";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        window.location.href = "/products";
      } else {
        setError(result.error || "Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        window.location.href = "/products";
      } else {
        setError(result.error || "Something went wrong");
      }
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-black p-8 rounded-lg shadow-sm dark:border dark:border-gray-800">
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
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-[0.5rem] text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-black text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-800 rounded-[0.5rem] text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{`${errors.email.message}`}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-800 rounded-[0.5rem] text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{`${errors.password.message}`}</p>
              )}
            </div>
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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[0.5rem] shadow-sm text-sm font-medium text-white dark:text-gray-900 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
