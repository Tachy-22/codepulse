"use client";
import { signOut } from "@/actions/firebase/auth";
import { updateUser } from "@/lib/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface UserDropdownProps {
  email: string;
  purchases?: string[];
  role?: string; // Add role to props
}

export default function UserDropdown({
  email,
  purchases,
  role,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      dispatch(updateUser(null));
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative md:flex-1 md:w-full" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 lg:px-4 lg:py-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-zinc-900 transition-colors duration-200 "
      >
        <Image
          src="/user-icon.png"
          alt="Avatar"
          width={1000}
          height={1000}
          className="rounded-full border border-gray4300 flex  overflow-hidden w-[40px]  min-w-[40px] h-[40px]"
        />
        <span className="text-gray-700 dark:text-gray-300 lg:flex hidden">
          {email}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="lg:flex hidden"
        >
          <ChevronDown className="h-4 w-4  " />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 mt-2 w-fit bg-gray-50 dark:bg-zinc-900 backdrop-blur-lg rounded-xl shadow-lg  -gray-200/50 dark:-gray-700/50 overflow-hidden"
          >
            <div className="p-3 -b -gray-200/50 dark:-gray-700/50">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                My Account
              </p>
              <span className="">{role}</span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400 ">
                {email}
              </span>

              {purchases && purchases.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-sm"
                >
                  PRO
                </motion.span>
              )}
            </div>

            <motion.div
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              className="-t -gray-200/50 dark:-gray-700/50"
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 b"
              >
                Logout
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
