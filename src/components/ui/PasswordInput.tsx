import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  label?: string;
}

export function PasswordInput({
  registration,
  error,
  placeholder = "Password",
  label,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label className="sr-only">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-800 rounded-[0.5rem] text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          placeholder={placeholder}
          {...registration}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
