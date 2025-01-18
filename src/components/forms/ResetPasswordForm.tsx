"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { Lock, Loader, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/actions/firebase/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<{ password: string }>({
      resolver: zodResolver(resetPasswordSchema),
    });

  const onSubmit = async (data: { password: string }) => {
    if (!oobCode) {
      setError("Invalid reset link");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const result = await resetPassword(oobCode, data.password);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err: unknown) {
      setError(`"Something went wrong" ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-black p-8 rounded-lg shadow-sm dark:border dark:border-gray-800">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 dark:text-green-500">
              Your password has been successfully reset.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-500 hover:text-blue-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
