"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProducts } from "@/lib/redux/productSlice";
import { ProductData } from "@/types";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/redux/hooks";
import AddSnippetModal from "./modals/AddSnippetModal";

interface SideNavigationProps {
  products: ProductData[];
}

// Custom scrollable container with animated scrollbar
const ScrollableContainer = ({
  children,
  isNavHovered,
}: {
  children: React.ReactNode;
  isNavHovered: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollInfo({
        scrollTop: container.scrollTop,
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
      });
    };

    // Initial calculation
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scrollbar thumb position and size
  const scrollbarHeight =
    (scrollInfo.clientHeight / scrollInfo.scrollHeight) * 100;
  const scrollbarTop = (scrollInfo.scrollTop / scrollInfo.scrollHeight) * 100;
  const shouldShowScrollbar = scrollInfo.scrollHeight > scrollInfo.clientHeight;

  return (
    <div className="relative w-[16rem]  flex-1 min-h-full  h-screen bg-white/50 lg:dark:bg-transparent dark:bg-black/50  backdrop-blur-2xl">
      <div
        ref={containerRef}
        className="overflow-y-auto min-h-full h-full scrollbar-hide flex flex-col gap-3 "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {shouldShowScrollbar && (
        <motion.div
          className="absolute lg:right-0 right-3 top-0 w-1.5 h-full bg-gray-200 dark:bg-gray-800 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isNavHovered ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute w-1.5 rounded-full bg-gray-500 dark:bg-gray-400"
            style={{
              height: `${Math.max(scrollbarHeight, 10)}%`,
              top: `${scrollbarTop}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isNavHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}
    </div>
  );
};

const SideNavigation = ({ products }: SideNavigationProps) => {
  const dispatch = useDispatch();
  const [showSideNavOnMobile, setShowSideNavOnMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { user } = useAppSelector((state) => state.userSlice);
  const userId = user?.id;
  const [isNavHovered, setIsNavHovered] = useState(false);

  const mySnippets = products.filter((product) => {
    if (userId) {
      return product.ownerId === userId;
    } else return false;
  });
  const cpSnippets = products.filter((product) => {
    if (userId) {
      return product.ownerId !== userId;
    } else return product;
  });

  useEffect(() => {
    try {
      dispatch(setProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowSideNavOnMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`h-screen  min-h-screen w-[18.5rem] lg:w-[16rem]  flex-col lg:flex fixed  lg:static left-[-9px]  lg:px-0 px-2 lg:z-10 z-[150] overflow-y-auto   text-gray-800 dark:text-white transition-transform duration-300 ease-in-out transform pb-5 ${
        showSideNavOnMobile
          ? "translate-x-0"
          : "-translate-x-[calc(20rem-4.25rem)] lg:translate-x-0"
      }`}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <ScrollableContainer isNavHovered={isNavHovered}>
        <div className="translate-x-[calc(16rem-8px)] top-7 w-fit fixed h-fit bg-slate-100 lg:dark:bg-transparent dark:bg-stone-700 rounded-[5px] lg:hidden z-[200]">
          <motion.div
            className="!p-2 cursor-pointer"
            onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
            animate={{ rotate: showSideNavOnMobile ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4  " />
          </motion.div>
        </div>
        <div className="flex flex-col gap-4 h-full  py-6 w-[16rem] lg:w-full mb-5">
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
            <div className="flex flex-col gap-4">
              {cpSnippets.map((product) => (
                <Link
                  onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block px-2 ml-4 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  {product.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="px-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-950 dark:text-gray-100">
                <span>My Snippets</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {mySnippets.map((product) => (
                <div className="w-full" key={product.id}>
                  <Link
                    onClick={() => setShowSideNavOnMobile(!showSideNavOnMobile)}
                    href={`/products/${product.id}`}
                    className="block px-2 ml-4 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    {product.title}
                  </Link>
                </div>
              ))}
              <div className="mr-4">
                {userId && <AddSnippetModal showAsMenuItem />}
              </div>
            </div>
          </div>
        </div>
      </ScrollableContainer>
    </nav>
  );
};

export default SideNavigation;
