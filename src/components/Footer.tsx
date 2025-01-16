"use client";
import React from "react";
import { FaCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-white dark:bg-black text-white py-[5rem] border-t border-gray-500 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 ">
        <div className="flex flex-col gap-6 md:flex-row justify-between items-start space-y-8 md:space-y-0">
          {/* Left Section */}
          <div className="space-y-3">
            <h1 className="text-xl flex gap-3 items-center font-semibold text-black dark:text-white">
              <FaCode /> <span className="">CodePulse</span>
            </h1>
            <p className="text-sm dark:text-gray-400   text-gray-700 dark:hover:text-gray-400 text-nowrap flex gap-1 items-center">
              A product by{" "}
              <a
                href="/"
                className="flex items-center space-x-2  text-cyan-500 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
              >
                CodePulse
              </a>
            </p>
            <p className="text-sm dark:text-gray-400   text-gray-700 dark:hover:text-gray-400 text-nowrap flex gap-1 items-center">
              Building in public at{" "}
              <a
                href="https://twitter.com/entekume_j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2  text-cyan-500 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
              >
                {" "}
                @entekume_j
              </a>
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950 transition-colors "
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950 transition-colors "
              >
                Components
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950 transition-colors "
              >
                Templates
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950 transition-colors "
              >
                Categories
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Box Shadows
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Showcase
              </a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Discord
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Aceternity UI Pro
              </a>
              <a
                href="#"
                className="text-sm dark:text-gray-400  text-gray-700 dark:hover:text-gray-400 hover:text-gray-950"
              >
                Aceternity
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
