import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/redux/hooks";
import { ProductData } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { products } = useAppSelector((state) => state.productSlice);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ProductData[]>(products);

  useEffect(() => {
    if (searchTerm) {
      const filtered = results.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } else setResults(products);
  }, [results, searchTerm, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed  right-0 left-0 top-[9rem] mx-auto z-[200] md:w-full w-[90%] md:max-w-3xl  bg-white dark:bg-zinc-950 rounded-xl shadow-lg py-8 px-6 md:p-6 border border-zinc-200 dark:border-zinc-800 h-fit"
          >
            <Button
              onClick={onClose}
              className="absolute right-0 top-0 w-fit flex items-end"
            >
              <X
                size={14}
                className=" md:hidden absolute -right-[1.5rem] -top-[2rem] hover:text-red-500 border hover:border-red-500 rounded-full " 
              />
            </Button>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search snippets..."
                className="w-full px-4 py-2 rounded-xl border border-zinc-200/70 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                autoFocus
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-zinc-400" />
            </div>

            {results.length > 0 && (
              <div className="mt-4  space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-lg">
                {results.map((result, index) => (
                  <Link
                    onClick={onClose}
                    href={"/products/" + result.id}
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-lg cursor-pointer transition-colors duration-100"
                  >
                    <div className="flex-shrink-0 w-4 h-4">
                      <Search className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">
                        {result.title}
                      </span>
                      <span className="text-xs text-zinc-400">Snippet</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
