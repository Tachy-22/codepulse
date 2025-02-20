"use client";
import React from "react";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const column1Links = [
    { href: "/snippets", label: "Snippets" },
  ];

  const column2Links = [
    {
      href: "https://twitter.com/entekume_j",
      label: "Twitter",
      external: true,
    },
  ];

  const column3Links = [{ href: "/", label: "Codepulse", external: false }];

  return (
    <footer className="bg-white dark:bg-black text-white py-[5rem] border-t border-gray-500 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row justify-between items-start space-y-8 md:space-y-0">
          {/* Left Section */}
          <div className="space-y-3">
            <h1 className="text-xl flex gap-3 items-center font-semibold text-black dark:text-white">
              <FaCode /> <span>CodePulse</span>
            </h1>
            <p className="text-sm dark:text-gray-400 text-gray-700 text-nowrap flex gap-1 items-center">
              A product by{" "}
              <Link
                href="/"
                className="text-cyan-500 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                CodePulse
              </Link>
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-700 text-nowrap flex gap-1 items-center">
              Building in public at{" "}
              <a
                href="https://twitter.com/entekume_j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cyan-500 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
              >
                @entekume_j
              </a>
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              {column1Links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-700 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              {column2Links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-700 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              {column3Links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-700 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
