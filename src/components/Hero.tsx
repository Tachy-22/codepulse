"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const { user } = useAppSelector((state) => state.userSlice);
  const userId = user?.id;

  return (
    <div className="md:h-[80vh] h-[50vh] py-[1rem] lg:py-0 w-full max-w-7xl bg-white dark:bg-black flex items-center justify-between   mx-auto gap-12  ">
      <Image
        width={3000}
        height={3000}
        alt="img1"
        src={"/wave.svg"}
        className="h-full w-full absolute hidden md:flex md:-bottom-[10rem] lg:-bottom-[6rem] right-0 "
        priority
      />
      <div className="flex flex-col md:w-[40%] relative px-4">
        <Image
          width={300}
          height={300}
          alt="img1"
          src={"/green-curve-shape.svg"}
          className="absolute lg:-top-[10rem] lg:left-[0rem] -top-[6rem] left-0 z-10 w-[160px] h-[156px] lg:scale-100 scale-[80%] rotate-180"
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold  text-black dark:text-white relative z-20 flex gap-3">
          <span className=""> Empower Your Coding Journey</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mt-4">
          Join a vibrant community where you can create, share, and discover
          invaluable code snippets tailored for Next.js, JavaScript, and
          TypeScript.
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
          <Link
            href="/products"
            className=" p-2 text-sm hover:text-blue-800 hover:bg-gray-200 dark:hover:bg-white/20 hover:rounded-[0.5rem] transition-all duration-300 border-b-2 border-blue-500/80 text-blue-900 dark:text-blue-400"
          >
            Explore Features
          </Link>
        </div>
        <Image
          width={300}
          height={300}
          alt="img1"
          src={"/orange-curve-shape.svg"}
          className="absolute lg:bottom-[0rem] lg:right-[0rem] bottom-0 right-0 z-10 w-[160px] h-[156px] lg:scale-100 scale-[80%] "
        />
      </div>
      <div className=" hidden md:flex rounded-l-full rounded-b-full overflow-hidden translate-x-[6rem] -translate-y-[16rem]">
        <Image
          width={3000}
          height={3000}
          alt="img1"
          src={"/hero-img.avif"}
          className="h-full w-full aspect-square "
          priority
        />
      </div>
    </div>
  );
}
