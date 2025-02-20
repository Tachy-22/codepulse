"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import { useState } from "react";
import { Mail, User, Loader } from "lucide-react";
import { register, signInWithGoogle } from "@/actions/firebase/auth";
import Link from "next/link";
import { createUser } from "@/actions/firebase/users";
import { PasswordInput } from "../ui/PasswordInput";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  type FormData = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  };

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await register(data.email, data.password, data.name);
      if (result.success) {
        // Create user in database
        const userResult = await createUser({
          id: result.userId!,
          email: data.email,
          name: data.name,
        });

        if (userResult.success) {
          window.location.href = "/auth/login";
        } else {
          setError(userResult.error || "Failed to create user profile");
        }
      } else {
        setError(result.error || "Something went wrong");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-black p-8 rounded-lg shadow-sm dark:border dark:border-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-[0.5rem] text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <FcGoogle size={24} />
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...registerForm("name")}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-800 rounded-[0.5rem] text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Full Name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{`${errors.name.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...registerForm("email")}
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-800 rounded-[0.5rem] text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{`${errors.email.message}`}</p>
            )}
          </div>

          <div className="space-y-4">
            <PasswordInput
              registration={registerForm("password")}
              error={errors.password?.message}
              label="Password"
              placeholder="Create password"
            />

            <PasswordInput
              registration={registerForm("confirmPassword")}
              error={errors.confirmPassword?.message}
              label="Confirm Password"
              placeholder="Confirm password"
            />

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
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
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
