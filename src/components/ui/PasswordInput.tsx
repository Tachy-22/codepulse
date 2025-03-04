import { Input } from "@heroui/react";
import { Eye, EyeOff, Lock } from "lucide-react";
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
      <div className="relative">
        <Input
          startContent={<Lock className="h-5 w-5 text-gray-400" />}
          variant="bordered"
          label={label}
          labelPlacement="inside"
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...registration}
          errorMessage={error}
          endContent={
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
          }
        />
      </div>
    
  );
}
