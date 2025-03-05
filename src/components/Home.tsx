"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Button, Accordion, AccordionItem } from "@heroui/react";

// SEO metadata component
const Metadata = () => (
  <Head>
    <title>CodePulse - The Next.js Code Snippet Hub</title>
    <meta
      name="description"
      content="Discover, share and use reusable Next.js code snippets. Join the CodePulse community today."
    />
    <meta
      name="keywords"
      content="nextjs, code snippets, react, javascript, web development, codepulse"
    />
    <meta property="og:title" content="CodePulse - Next.js Code Snippet Hub" />
    <meta
      property="og:description"
      content="Discover, share and use reusable Next.js code snippets."
    />
    <meta property="og:type" content="website" />
  </Head>
);

// Sample featured snippets data
const featuredSnippets = [
  {
    id: 1,
    title: "Next.js API Route Handler",
    description:
      "A reusable API route handler with error handling and response formatting",
    language: "typescript",
    code: "export async function GET(req: Request) {\n  try {\n    // Your logic here\n    return new Response(JSON.stringify({ data }), {\n      status: 200,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  } catch (error) {\n    return new Response(JSON.stringify({ error: error.message }), {\n      status: 500,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  }\n}",
  },
  {
    id: 2,
    title: "Animated Page Transition",
    description: "Smooth page transitions with Framer Motion",
    language: "tsx",
    code: "export const PageTransition = ({ children }) => {\n  return (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n      transition={{ duration: 0.3 }}\n    >\n      {children}\n    </motion.div>\n  );\n};",
  },
  {
    id: 3,
    title: "Data Fetching with SWR",
    description: "Optimized data fetching pattern using SWR",
    language: "tsx",
    code: "import useSWR from 'swr';\n\nexport function useData(id) {\n  const fetcher = (...args) => fetch(...args).then(res => res.json());\n  const { data, error } = useSWR(`/api/data/${id}`, fetcher);\n\n  return {\n    data,\n    isLoading: !error && !data,\n    isError: error\n  };\n}",
  },
];

// FAQ data
const faqItems = [
  {
    question: "How do I contribute my own code snippets?",
    answer:
      "After signing up, you can submit your snippets through our 'Contribute' page. All submissions are reviewed by our team to ensure quality and security before being published to the platform.",
  },
  {
    question: "Are the code snippets free to use?",
    answer:
      "Yes, all snippets on CodePulse are free to use in personal and commercial projects. We do ask that you don't redistribute collections of our snippets as your own product.",
  },
  {
    question: "How often are new snippets added?",
    answer:
      "Our library grows every day! We add new verified snippets daily, and our community contributes dozens of new snippets each week that go through our quality review process.",
  },
  {
    question: "Can I request a specific snippet if I can't find it?",
    answer:
      "Absolutely! You can request snippets through our community forum. Popular requests often get prioritized by our contributors and team members.",
  },
  {
    question: "Do you offer support for the snippets?",
    answer:
      "Each snippet includes documentation on usage. For additional help, our community forum is a great resource where both our team and other developers can assist with implementation questions.",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

// Enhanced Particle component with more variety
const Particles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => {
        const size = Math.random() * 5 + 1;
        const duration = Math.random() * 20 + 10;
        const x = Math.random() * 100;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              x: `${x}%`,
              y: "-10%",
              background:
                i % 3 === 0
                  ? "rgba(125, 187, 255, 0.6)"
                  : i % 3 === 1
                  ? "rgba(147, 149, 255, 0.6)"
                  : "rgba(168, 144, 255, 0.6)",
              filter: "blur(1px)",
              opacity,
            }}
            animate={{
              y: "110%",
              opacity: [opacity, opacity * 1.2, opacity * 0.5, 0],
              rotate: Math.random() > 0.5 ? [0, 90] : [0, -90],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

// Enhanced floating element with more 3D effect
const FloatingElement = ({
  children,
  delay = 0,
  scale = 1,
}: {
  children: React.ReactNode;
  delay?: number;
  scale?: number;
}) => (
  <motion.div
    className="relative"
    style={{
      transformStyle: "preserve-3d",
      perspective: "1000px",
      scale,
    }}
    animate={{
      y: [0, -15, 0],
      rotateX: [0, 4, 0],
      rotateY: [0, -4, 0],
      z: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Glow effect component
const GlowEffect = ({ className }: { className: string }) => (
  <div
    className={`absolute blur-[100px] rounded-full opacity-50 ${className}`}
  ></div>
);

// Improved animated gradient border card with hover effect
const GradientCard = ({
  className,
  children,
  hoverEffect = true,
}: {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}) => (
  <motion.div
    className={`relative rounded-2xl p-[1px] overflow-hidden ${className}`}
    whileHover={
      hoverEffect
        ? {
            scale: 1.02,
            transition: { duration: 0.2 },
          }
        : {}
    }
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <motion.div
        className="w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(79, 70, 229, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
    <div className="relative h-full w-full rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-6 shadow-lg">
      {children}
    </div>
  </motion.div>
);

// New shiny button component with better hover effects
const ShinyButton = ({
  children,
  primary = true,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  [key: string]: unknown;
}) => {
  return (
    <motion.button
      className={`relative rounded-xl px-8 py-4 text-lg font-medium shadow-lg overflow-hidden ${
        primary
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          : "border-2 border-blue-400/30 text-blue-600 dark:text-blue-300"
      } ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {primary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Improved gradient text component that works better on mobile
const GradientText = ({
  children,
  from = "from-blue-600",
  via = "via-indigo-600",
  to = "to-purple-600",
  className = "",
}: {
  children: React.ReactNode;
  from?: string;
  via?: string;
  to?: string;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r ${from} ${via} ${to}`}
      >
        {children}
      </span>
      {/* Fallback solid color for devices that don't support gradient text */}
      <span className="absolute inset-0 text-blue-600 dark:text-blue-400 z-0 opacity-0">
        {children}
      </span>
    </span>
  );
};

// // Code window component with better styling
// const CodeWindow = ({
//   code,
//   language = "jsx",
//   title = "Example.jsx",
//   theme = "dark"
// }: {
//   code: string,
//   language?: string,
//   title?: string,
//   theme?: "dark" | "light"
// }) => {
//   const themeClasses = theme === "dark"
//     ? "bg-gray-900 text-gray-100 border-gray-700"
//     : "bg-white text-gray-800 border-gray-200";

//   return (
//     <div className={`rounded-xl overflow-hidden border ${themeClasses} shadow-2xl`}>
//       <div className="flex items-center px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
//         <div className="flex space-x-2">
//           <div className="w-3 h-3 rounded-full bg-red-400"></div>
//           <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//           <div className="w-3 h-3 rounded-full bg-green-400"></div>
//         </div>
//         <div className="ml-4 text-sm text-gray-400">{title}</div>
//       </div>
//       <pre className={`p-4 overflow-x-auto ${language === "jsx" ? "language-jsx" : "language-typescript"}`}>
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// };

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-0 overflow-hidden min-h-screen w-full bg-white dark:bg-gray-950">
      <Metadata />

      {/* Enhanced Hero Section with Particles */}
      <section
        ref={heroRef}
        className="relative max-h-screen h-fit py-[15rem] w-full flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white dark:from-gray-900 dark:to-gray-950">
          <Particles />
        </div>

        {/* Enhanced glow effects */}
        <GlowEffect className="w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-500/10 -top-[100px] -left-[100px] animate-pulse" />
        <GlowEffect className="w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-500/10 -bottom-[100px] -right-[100px] animate-pulse" />

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              id="hero-heading"
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <GradientText>CodePulse</GradientText>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-gray-700/90 dark:text-gray-300/90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover, share, and leverage reusable Next.js code snippets to
              accelerate your development workflow.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <ShinyButton primary aria-label="Browse code snippets">
                Browse Snippets
              </ShinyButton>

              <ShinyButton
                primary={false}
                aria-label="Share your code snippets"
              >
                Share Your Code
              </ShinyButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced floating code blocks decoration */}
        <motion.div
          className="absolute bottom-[10%]  lg:bottom-[20%] md:bottom-[8%] right-[10%] opacity-80 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <FloatingElement delay={0.2} scale={0.8}>
            <div className="w-64 h-48 bg-blue-950/90 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-500/20 p-4 overflow-hidden">
              <pre className="text-sm text-blue-300">
                <code>{`function useCodePulse(id) {\n  const [snippet, setSnippet] = useState();\n  \n  // Fetch snippet by ID\n  useEffect(() => {\n    // Magic happens here\n    return snippetData;\n  }, [id]);\n}`}</code>
              </pre>
            </div>
          </FloatingElement>
        </motion.div>

        <motion.div
          className="absolute top-[8%] left-[5%] lg:top-[30%] lg:left-[10%] opacity-80 hidden md:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <FloatingElement delay={0.5} scale={1.1}>
            <div className="w-56 h-40 bg-purple-950/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-500/20 p-4 overflow-hidden">
              <pre className="text-sm text-purple-300">
                <code>{`<CodeSnippet\n  language="typescript"\n  title="Auth Hook"\n  showLineNumbers\n  copyable\n>\n  {code}\n</CodeSnippet>`}</code>
              </pre>
            </div>
          </FloatingElement>
        </motion.div>

        {/* Animated scroll indicator with better animation */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-medium">Scroll to explore</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Stats floating card */}
        <motion.div
          className="absolute bottom-[2%] left-[5%] lg:bottom-[10%] lg:left-[15%] opacity-0 hidden md:block"
          animate={{ opacity: [0, 0.9], y: [50, 0] }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-xl shadow-xl border border-blue-100 dark:border-blue-900/30">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1200+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Snippets
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  5k+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Developers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  99%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-gray-900"
        aria-labelledby="features-heading"
      >
        <GlowEffect className="w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/5 -bottom-[300px] -left-[300px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Why Choose <GradientText>CodePulse</GradientText>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed to help developers save time and improve
              code quality.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <GradientCard>
                <div className="text-blue-600 dark:text-blue-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Boost Productivity
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leverage battle-tested code snippets to accelerate your
                  development process and avoid reinventing the wheel.
                </p>
              </GradientCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GradientCard>
                <div className="text-blue-600 dark:text-blue-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Quality Assured
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All snippets are reviewed for best practices, performance, and
                  security to ensure high-quality code.
                </p>
              </GradientCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GradientCard>
                <div className="text-blue-600 dark:text-blue-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Community Driven
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join a growing community of Next.js developers sharing
                  knowledge and helping each other build better applications.
                </p>
              </GradientCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Snippets Section */}
      <section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950"
        aria-labelledby="snippets-heading"
      >
        <GlowEffect className="w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/5 -top-[300px] -right-[300px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="snippets-heading"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Popular <GradientText>Snippets</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover some of our most used code snippets that developers love.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredSnippets.map((snippet) => (
              <motion.div
                key={snippet.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="group h-full rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm border border-blue-100 dark:border-blue-900 overflow-hidden shadow-xl shadow-blue-500/5 transition-all duration-300">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {snippet.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {snippet.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative shadow-inner">
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 pt-4">
                        <code className="language-javascript">
                          {snippet.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                  <div className="px-8 py-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {snippet.language}
                    </span>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group-hover:translate-x-1 transition-transform"
                      aria-label={`View ${snippet.title} snippet details`}
                    >
                      View Details
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          delay: 2,
                        }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white dark:from-blue-500 dark:to-purple-500 shadow-xl shadow-blue-500/20 dark:shadow-blue-500/10 rounded-xl px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105"
              aria-label="Browse all available code snippets"
            >
              Browse All Snippets
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-gray-900"
        aria-labelledby="how-it-works-heading"
      >
        <GlowEffect className="w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/5 -bottom-[200px] left-[30%]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="how-it-works-heading"
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500"
            >
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Using CodePulse is simple and intuitive. Start in seconds.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                num: 1,
                title: "Browse",
                desc: "Explore our extensive collection of Next.js and React code snippets.",
              },
              {
                num: 2,
                title: "Copy",
                desc: "Select and copy the code snippets you need for your project.",
              },
              {
                num: 3,
                title: "Implement",
                desc: "Integrate the code into your project with ease and speed up development.",
              },
              {
                num: 4,
                title: "Contribute",
                desc: "Share your own snippets with the community to help others.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="text-center"
              >
                <div className="relative mb-8 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {step.num}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-950"
        aria-labelledby="faq-heading"
      >
        <GlowEffect className="w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/5 -top-[300px] -right-[300px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-10 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="faq-heading"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to some of the most common questions about CodePulse.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1  gap-2  h-max  p-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Accordion
                  //    title={item.question}
                  //   isOpen={activeAccordion === item.question}
                  // onClick={() =>
                  //   setActiveAccordion(
                  //     activeAccordion === item.question ? null : item.question
                  //   )
                  // }
                  showDivider={false}
                  variant="shadow"
                >
                  <AccordionItem
                    title={item.question}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {item.answer}
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-32 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 dark:from-blue-800 dark:via-blue-700 dark:to-purple-800">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundSize: "200% 200%",
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2),transparent)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.2),transparent)]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Ready to Supercharge Your Development?
            </h2>
            <p className="text-2xl text-blue-100 mb-10">
              Join thousands of developers who are already saving time and
              building better with CodePulse.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-800"
                aria-label="Get started with CodePulse"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
                aria-label="Learn more about how CodePulse works"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
