"use client";
import Image from "next/image";
import React from "react";

const Community = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full gap-6 px-4 relative mb-[6rem]">
      <div className="flex md:justify-end rounded-xl bg-gradient-to-r text-black to-[#e6f7f8] from-[#e2f9fc] p-8">
        <h2 className="max-w-[80%] md:w-1/2  text-4xl font-bold">
          Unlock Endless Coding Possibilities with CodePulse
        </h2>
      </div>
      <div className="flex flex-col md:items-end justify-between w-full gap-6 ">
        <p className="md:w-1/2 pr-4 md:max-w-[80%] text-lg text-gray-700 dark:text-gray-300">
          {" "}
          Join a thriving platform designed for developers to create, share, and
          access a diverse library of code snippets. Whether you&apos;re looking
          for Next.js, JavaScript, or TypeScript solutions, CodePulse empowers
          you to enhance your coding workflow.
        </p>
        <div className="  bg-gray-50 dark:bg-gray-50/10 md:w-1/2 p-4 px-6 rounded-full flex gap-4 text-cyan-500">
          <strong>500+</strong>
          Unique Code Snippets Available
        </div>
      </div>
      <div className="flex md:flex-row flex-col h-full items-center gap-4 md:absolute md:top-[3rem] w-full md:w-[22%] lg:-left-[2rem]">
        <Image
          width={3000}
          height={3000}
          alt="img1"
          src={"/community-img1.avif"}
          className="h-full w-full rounded-xl  object-cover border-4 border-white dark:border-gray-800"
        />
        <Image
          width={3000}
          height={3000}
          alt="img1"
          src={"/community-img2.avif"}
          className="h-full w-full rounded-xl object-cover border-4 border-white dark:border-gray-800 md:flex hidden"
        />
      </div>
    </div>
  );
};

export default Community;
