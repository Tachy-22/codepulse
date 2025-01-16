"use client";
import React from "react";
import Link from "next/link";
import { ProductT } from "@/types";

interface SideNavigationProps {
  products: ProductT[];
}

const SideNavigation = ({ products }: SideNavigationProps) => {
  return (
    <nav className="h-screen w-64 p-4 lg:px-0 hidden flex-col lg:flex overflow-y-auto pr-[5rem] hover-scrollbar text-gray-800 dark:text-white ">
      <div className="flex flex-col gap-4">
        <div className="nav-section">
          <div className="p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
              <span>Follow</span>
            </div>
          </div>
          <div className="ml-4 ">
            <a
              href="https://twitter.com/entekume_j"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              <span>@entekume_j</span>
            </a>
          </div>
        </div>

        <div className="nav-section">
          <div className="p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
              <span>Installations</span>
            </div>
          </div>
          <div className="ml-4 space-y-2 text-sm">
            <Link
              href="/products/nextjs-installation"
              className="block p-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Install Next.js
            </Link>
            <Link
              href="/products/stripe-installation"
              className="block p-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Install Stripe
            </Link>
          </div>
        </div>

        <div className="nav-section">
          <div className="p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
              <span>CP Snippets</span>
            </div>
          </div>
          <div className="ml-4 flex flex-col gap-2 text-sm max-h-full overflow-y-auto hover-scrollbar">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block p-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                {product.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
