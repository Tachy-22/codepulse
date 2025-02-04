"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const { user } = useAppSelector((state) => state.userSlice);
  const userId = user?.id;

  return (
    <div className="lg:h-screen py-[3rem] lg:py-0 w-full max-w-7xl bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden p-4 mx-auto relative">
      <Image
        width={300}
        height={300}
        alt="img1"
        src={"/green-curve-shape.svg"}
        className="absolute lg:top-[5rem] lg:left-[4rem] -top-[2rem] left-0 z-10 w-[160px] h-[156px] lg:scale-100 scale-[80%] rotate-180"
      />
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold md:text-center text-black dark:text-white relative z-20 flex gap-3">
        <span className="">
          {" "}
          Streamline Your Development With CodePulse Your Snippets Hub{" "}
        </span>
      </h1>
      <p className="text-base md:text-lg lg:text-xl md:text-center text-gray-700 dark:text-gray-300 mt-4">
        CodePulse empowers developers to simplify their workflow by providing a
        vast library of utility code snippets, making coding faster and more
        efficient. Tailor your own snippets to fit your projects perfectly.
      </p>

      <div className="w-full md:w-[40rem] h-10 relative mt-8">
        {/* Gradients */}
        <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
      <div className="flex md:w-fit w-full gap-6 sm:flex-row flex-col">
        <Link
          href={`${userId ? "/products" : "/auth/login"}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-[0.5rem] hover:bg-blue-400/90 transition-all duration-300"
        >
          Get Started
        </Link>
        <Link href="/products" className=" p-2 text-sm hover:text-blue-800 hover:bg-gray-200 dark:hover:bg-white/20 hover:rounded-[0.5rem] transition-all duration-300 border-b-2 border-blue-500/80 text-blue-900 dark:text-blue-400">
          Explore Features
        </Link>
      </div>
      <Image
        width={300}
        height={300}
        alt="img1"
        src={"/orange-curve-shape.svg"}
        className="absolute lg:bottom-[10rem] lg:right-[10rem] bottom-0 right-0 z-10 w-[160px] h-[156px] lg:scale-100 scale-[80%] "
      />
    </div>
  );
}
