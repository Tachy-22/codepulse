"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { Loader, ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/actions/firebase/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  type ForgotPasswordForm = { email: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await forgotPassword(data.email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-black p-8 rounded-lg shadow-sm dark:border dark:border-gray-800">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-100"
              />
              {errors.email?.message && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-600 dark:text-red-500">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-600 dark:text-green-500">
              A password reset link has been sent to your email address.
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                "Send reset link"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <Link
            href="/auth/login"
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
