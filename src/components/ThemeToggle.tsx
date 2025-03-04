"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
isIconOnly
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative hover:bg-transparent  hover:border-gray-600 dark:hover:border-gray-50 transition duration-500"
    >
      <Sun
        size={12}
        className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0   duration-500 text-xl text-gray-700 hover:text-gray-800"
      />
      <Moon
        size={12}
        className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100   duration-500 text-gray-500 hover:text-gray-400"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
