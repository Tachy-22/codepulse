"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";

import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import SearchModal from "./SearchModal";

import UserDropdown from "./UserDropdown";
import AddSnippetModal from "./modals/AddSnippetModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAppSelector((state) => state.userSlice);
  const userId = user?.id;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SearchBar = () => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative flex items-center rounded-xl cursor-pointer lg:flex-1  border border-zinc-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg text-zinc-400 dark:text-zinc-500"
      onClick={() => setIsSearchOpen(true)}
    >
      <div className="px-4 py-2 w-full md:w-64  hidden md:block">Search...</div>
      <Search className="absolute right-3  h-5 w-5 text-zinc-400" />
    </motion.div>
  );

  const NavLinks = () => (
    <>
      <Link
        onClick={() => setIsOpen(false)}
        href="/products"
        className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Snippets{" "}
      </Link>
    
      {userId && <AddSnippetModal />}
    </>
  );

  const AuthButtons = () => (
    <>
      {userId ? (
        <UserDropdown
          email={user.email}
          purchases={user.purchases}
          role={user.role as string} // Add role prop
        />
      ) : (
        <Link
          href="/auth/login"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 !rounded-[0.5rem] text-sm font-medium"
        >
          Login
        </Link>
      )}
    </>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed top-0 right-0 h-screen w-screen lg:w-[30rem] shadow-lg p-6 z-50 bg-white dark:bg-zinc-950"
          >
            <div className="flex justify-between mb-4">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col space-y-4">
              <NavLinks />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav
        className={`border-b sticky w-full top-0 backdrop-blur-lg bg-white/80 dark:bg-black/80 z-[1000] ${
          scrolled
            ? " border-zinc-200/50 dark:border-zinc-700/50 shadow-sm"
            : "border-transparent"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 lg:px-8 py-[0.4rem]">
          <div className="flex justify-between h-16 items-center gap-6">
            <Link
              href="/"
              className="text-xl  flex gap-3 font-bold items-center text-blue-500 dark:text-white"
            >
              <FaCode /> <span className="">CodePulse</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 w-full ">
              <NavLinks />
            </div>

            <div className="flex  items-center justify-end lg:justify-start md: w-full  md:gap-4  gap-1">
              <SearchBar />
              <AuthButtons />
              <div className="md:flex hidden">
                {" "}
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center  md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        <MobileMenu />
      </nav>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
