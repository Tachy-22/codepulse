"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "@heroui/react";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Page() {
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto min-h-screen w-full bg-white dark:bg-gray-900">
      <Metadata />

      {/* Hero Section with Mesh Background */}
      <section
        className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-blue-50 dark:bg-gray-800">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-200">
                CodePulse
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Discover, share, and leverage reusable Next.js code snippets to
              accelerate your development workflow.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                aria-label="Browse code snippets"
              >
                Browse Snippets
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                aria-label="Share your code snippets"
              >
                Share Your Code
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-white dark:bg-gray-900"
        aria-labelledby="features-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why Choose CodePulse?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed to help developers save time and improve
              code quality.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-gray-800 p-8 rounded-xl"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
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
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Boost Productivity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leverage battle-tested code snippets to accelerate your
                development process and avoid reinventing the wheel.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-gray-800 p-8 rounded-xl"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
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
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Quality Assured
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All snippets are reviewed for best practices, performance, and
                security to ensure high-quality code.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-gray-800 p-8 rounded-xl"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
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
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join a growing community of Next.js developers sharing knowledge
                and helping each other build better applications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Snippets Section */}
      <section
        className="py-20 bg-gray-50 dark:bg-gray-800"
        aria-labelledby="snippets-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="snippets-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Popular Snippets
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover some of our most used code snippets that developers love.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredSnippets.map((snippet) => (
              <motion.div
                key={snippet.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {snippet.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {snippet.description}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-javascript">
                        {snippet.code}
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="px-6 py-4 bg-blue-50 dark:bg-gray-800 flex justify-between items-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {snippet.language}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`View ${snippet.title} snippet details`}
                  >
                    View Details →
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Browse all available code snippets"
            >
              Browse All Snippets
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-20 bg-white dark:bg-gray-900"
        aria-labelledby="how-it-works-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Using CodePulse is simple and intuitive. Start in seconds.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Browse
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our extensive collection of Next.js and React code
                snippets.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Copy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select and copy the code snippets you need for your project.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Implement
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Integrate the code into your project with ease and speed up
                development.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                  4
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Contribute
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your own snippets with the community to help others.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Supercharge Your Development?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who are already saving time and
              building better with CodePulse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-800"
                aria-label="Get started with CodePulse"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700/50 dark:hover:bg-blue-800/50"
                aria-label="Learn more about how CodePulse works"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
