"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProducts } from "@/lib/redux/productSlice";
import { ProductData } from "@/types";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface SideNavigationProps {
  products: ProductData[];
}

const SideNavigation = ({ products }: SideNavigationProps) => {
  const dispatch = useDispatch();
  const [showSideNavOnMobile, setShowSideNavOnMobile] = useState(true);

  useEffect(() => {
    try {
      dispatch(setProducts(products));
      // Optionally set current product to first one
      //   dispatch(setCurrentProduct(products.length > 0 ? products[0] : null));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch, products]);

  return (
    <nav
      className={`h-screen w-[20rem] lg:w-64  flex-col lg:flex fixed lg:static left-[-9px] lg:pr-[5rem] lg:px-0 px-2 pr-[4rem] lg:z-10 z-[150] overflow-y-auto  hover-scrollbar text-gray-800 dark:text-white transition-transform duration-300 ease-in-out transform ${
        showSideNavOnMobile
          ? "translate-x-0"
          : "-translate-x-[calc(20rem-4.25rem)] lg:translate-x-0"
      }`}
    >
      <div className="translate-x-[calc(16rem-8px)] dark:bg-black/50 bg-white/80  backdrop-blur-2xl w-fit fixed rounded-r-[5px] lg:hidden">
        <Button
          className="!p-2"
          onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
        >
          <Menu />
        </Button>
      </div>
      <div className="flex flex-col gap-4 bg-white/80 dark:bg-black/50 backdrop-blur-2xl h-full  py-4  ">
        <div className="flex flex-col gap-3">
          <div className="px-3 rounded-lg">
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

        <div className="flex flex-col gap-3">
          <div className="px-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
              <span>Installations</span>
            </div>
          </div>
          <div className="ml-4 flex flex-col gap-3 text-sm">
            <Link
              onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
              href="/products/nextjs-installation"
              className="block px-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Install Next.js
            </Link>
            <Link
              onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
              href="/products/stripe-installation"
              className="block px-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Install Stripe
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="px-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
              <span>CP Snippets</span>
            </div>
          </div>
          <div className="ml-4 flex flex-col gap-3 text-sm max-h-full overflow-y-auto hover-scrollbar">
            {products.map((product) => (
              <Link
                onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
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
