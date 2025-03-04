"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import { useState, useEffect } from "react";
import { Mail, User, Loader, Check, X } from "lucide-react";
import { register } from "@/actions/firebase/auth";
import Link from "next/link";
import { createUser } from "@/actions/firebase/users";
import { PasswordInput } from "../ui/PasswordInput";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/lib/auth";
import { Input } from "@heroui/react";
import { getErrorMessage } from "@/lib/utils";



interface PasswordCriteriaProps {
  password: string;
}

// New component for visual password validation
const PasswordCriteriaCheck = ({ password }: PasswordCriteriaProps) => {
  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Helper function to get the CSS class based on validation state
  const getClassForCriteria = (isValid: boolean) => {
    return isValid
      ? "text-green-500 dark:text-green-400 flex items-center"
      : "text-gray-500 dark:text-gray-400 flex items-center";
  };

  return (
    <div className="text-sm mt-2 space-y-1">
      <p className="font-medium text-gray-700 dark:text-gray-300">
        Password must contain:
      </p>
      <ul className="grid grid-cols-2 mt-1">
        <li className={getClassForCriteria(hasMinLength)}>
          {hasMinLength ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <X className="h-4 w-4 mr-1" />
          )}
          At least 8 characters
        </li>
        <li className={getClassForCriteria(hasUpperCase)}>
          {hasUpperCase ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <X className="h-4 w-4 mr-1" />
          )}
          One uppercase letter
        </li>
        <li className={getClassForCriteria(hasLowerCase)}>
          {hasLowerCase ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <X className="h-4 w-4 mr-1" />
          )}
          One lowercase letter
        </li>
        <li className={getClassForCriteria(hasNumber)}>
          {hasNumber ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <X className="h-4 w-4 mr-1" />
          )}
          One number
        </li>
        <li className={getClassForCriteria(hasSpecialChar)}>
          {hasSpecialChar ? (
            <Check className="h-4 w-4 mr-1" />
          ) : (
            <X className="h-4 w-4 mr-1" />
          )}
          One special character
        </li>
      </ul>
    </div>
  );
};

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  type FormData = {
    email: string;
    password: string;
    name: string;
    // Removed confirmPassword field
  };

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  // Watch the password field for changes
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.password) {
        setPassword(value.password);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
          provider: "EMAIL",
        });

        if (userResult.success) {
          window.location.href = "/auth/login";
        } else {
          setError(userResult.error || "Failed to create user profile");
        }
      } else {
        setError(getErrorMessage(result.error || ""));
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "";
      setError(getErrorMessage(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        // Immediately redirect to products page instead of login
        window.location.href = "/products";
      } else {
        setError(result.error || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-full py-4 min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-50 dark:bg-black px-4">
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <Input
              variant="bordered"
              label="Full Name"
              //labelPlacement="outside"
              startContent={<User className="h-5 w-5 text-gray-400" />}
              {...registerForm("name")}
              errorMessage={errors.name?.message as string}
              placeholder="Full Name"
            />
          </div>

          <div>
            <Input
              variant="bordered"
              label="Email address"
              //labelPlacement="outside"
              startContent={<Mail className="h-5 w-5 text-gray-400" />}
              {...registerForm("email")}
              type="email"
              errorMessage={errors.email?.message as string}
              placeholder="Email address"
            />
          </div>

          <div className="flex flex-col gap-5">
            <PasswordInput
              registration={registerForm("password")}
              error={errors.password?.message}
              label="Password"
              placeholder="Create password"
            />

            {/* Password criteria checker with visual feedback */}
            <PasswordCriteriaCheck password={password} />
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center mt-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[0.5rem] shadow-sm text-sm font-medium text-white bg-blue-600 ho hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
