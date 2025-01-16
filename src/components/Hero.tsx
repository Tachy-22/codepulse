"use client";
import React from "react";
import { SparklesCore } from "./ui/Sparkles";
import { FaCode } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();

  const particleColor = theme === "light" ? "#000000" : "#FFFFFF";

  return (
    <div className="h-screen w-full bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden ">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-black dark:text-white relative z-20 flex gap-3">
        <FaCode />
        <span className=""> CodePulse </span>
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={particleColor}
          theme={theme as "light" | "dark"}
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
