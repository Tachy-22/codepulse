"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-click-outside";
import { ProductT } from "@/types";
import { useAppSelector } from "@/lib/redux/hooks";
import { createCheckoutSession } from "@/actions/stripe/stripe";
import Link from "next/link";

const gradientMap = new Map<string, string>();

const getRandomGradient = (id: string) => {
  if (gradientMap.has(id)) {
    return gradientMap.get(id);
  }

  const gradients = [
    'linear-gradient(45deg, #FF0000, #00FF00)',
    'linear-gradient(45deg, #FF00FF, #FFFF00)',
    'linear-gradient(45deg, #00FFFF, #FF0000)',
    'linear-gradient(45deg, #FF1493, #00FA9A)',
    'linear-gradient(45deg, #FF4500, #00CED1)',
    'linear-gradient(45deg, #9400D3, #FFD700)',
    'linear-gradient(45deg, #FF69B4, #7FFF00)',
  ];
  
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  gradientMap.set(id, gradient);
  return gradient;
};

interface Card {
  id: string;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  price: number;
  currentLevel: string[];
  content: () => React.ReactNode;
}

export function ExpandableCardDemo({ projects }: { projects: ProductT[] }) {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.userSlice);

  const handlePurchase = async (productId: string) => {
    if (!user?.id) {
      setError("Please login to purchase");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await createCheckoutSession(productId, user?.id);

      if (result.url) {
        window.location.href = result.url;
      } else {
        setError("Failed to create checkout session");
      }
    } catch (err) {
      setError("An error occurred while processing your request");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div 
                layoutId={`image-${active.title}-${id}`}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
                style={{ background: active.src }}
              />
              <div>
                <div className="flex flex-col gap-5 justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {active.currentLevel.map((level, index) => (
                        <li key={index} className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {level}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {user?.purchases?.includes(active.id) || active.price === 0 ? (
                    <Link
                      onClick={() => setActive(null)}
                      href={active.ctaLink}
                      className="px-4 py-3 w-full text-sm rounded-full font-bold bg-green-500 text-white text-center hover:bg-green-600"
                    >
                      View Code
                    </Link>
                  ) : (
                    <button
                      onClick={() => handlePurchase(active.id)}
                      disabled={isLoading}
                      className={`px-4 w-full py-3 text-sm rounded-full font-bold ${
                        isLoading
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white text-center`}
                    >
                      {isLoading ? "Processing..." : "Get Code"}
                    </button>
                  )}
                </div>
                {error && (
                  <p className="text-red-500 text-sm px-4 mb-2">{error}</p>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="mx-auto w-full columns-1 md:columns-2 space-y-6 ">
        {projects.map((project) => {
          const hasPurchased = user?.purchases?.includes(project.id);
          const card: Card = {
            id: project.id,
            description: project.description,
            title: project.title,
            src: getRandomGradient(project.id) as string,
            ctaText: "Get Code",
            ctaLink: `/products/${project.id}`,
            price: project.price,
            currentLevel: project.currentLevel || [], // Assuming currentLevel exists in ProductT
            content: () => (
              <div>
                <p>{project.description}</p>
                <p className="mt-4 font-mono">
                  Price: ${(project.price / 100).toFixed(2)}
                </p>
              </div>
            ),
          };

          return (
            <div key={card.title} className="break-inside-avoid mb-6">
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border  border-slate-300 dark:border-slate-500"
              >
                <motion.div 
                  layoutId={`image-${card.title}-${id}`}
                  className="w-full h-60 rounded-lg"
                  style={{ background: card.src }}
                />
                <div className="flex flex-col mt-4">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-base"
                  >
                    {card.title}
                  </motion.h3>
                </div>
                {hasPurchased || project.price === 0 ? (
                  <span className="text-green-600 text-sm mt-2">
                    {project.price === 0 ? "✓ Free" : "✓ Purchased"}
                  </span>
                ) : null}
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
