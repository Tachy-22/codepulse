"use client";
import { fetchDocument } from "@/actions/firebase/fetchDocument";
import CodeTabs from "@/components/CodeTabs";
import { useEffect, useState } from "react";
import React from "react";
import { Link2 } from "lucide-react";
import FileTree from "@/components/FileTree";
import CodeBlock from "@/components/ui/code-block";
import { ProductT } from "@/types";

interface ProductData extends ProductT {
  installations: Array<{ title: string; description: string; code: string }>;
  fileTree: string;
  currentLevel: string[];
  optimizationSuggestions: string[];
  usefulLinks: Array<{ title: string; href: string }>;
  [key: string]: unknown;
}

const InstallationGuide = ({ type }: { type: "nextjs" | "stripe" }) => {
  const guides = {
    nextjs: {
      title: "Install Next.js",
      description: "Create a new Next.js app with TypeScript and Tailwind CSS",
      steps: [
        {
          title: "Create Next.js App",
          description: "Use create-next-app to bootstrap your project",
          code: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
        },
        {
          title: "Navigate to Project",
          description: "Move into your project directory",
          code: "cd my-app",
        },
        {
          title: "Start Development Server",
          description: "Run the development server",
          code: "npm run dev",
        },
      ],
      folderStructure: `my-app/
  node_modules/
  public/
    next.svg
    vercel.svg
  src/
    app/
      favicon.ico
      globals.css
      layout.tsx
      page.tsx
    components/
  .eslintrc.json
  .gitignore
  next.config.js
  package.json
  postcss.config.js
  tailwind.config.ts
  tsconfig.json`,
    },
    stripe: {
      title: "Install Stripe",
      description: "Add Stripe payments to your Next.js application",
      steps: [
        {
          title: "Install Stripe Dependencies",
          description: "Install the required Stripe packages",
          code: "npm install stripe @stripe/stripe-js",
        },
        {
          title: "Install Stripe CLI (Optional)",
          description: "Install Stripe CLI for webhook testing",
          code: "brew install stripe/stripe-cli/stripe",
        },
        {
          title: "Login to Stripe CLI",
          description: "Authenticate with your Stripe account",
          code: "stripe login",
        },
      ],
      folderStructure: `my-app/
  src/
    app/
      api/
        stripe/
          webhook/
            route.ts
          create-session/
            route.ts
      checkout/
        page.tsx
    lib/
      stripe.ts
  .env.local
  package.json`,
    },
  };

  const guide = type === "nextjs" ? guides.nextjs : guides.stripe;
  const borderColor = "blue";

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {guide.description}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {guide.steps.map((step, index) => (
            <div key={index} className="relative pl-8 ml-8">
              {/* Vertical Line */}
              <div
                className={`absolute left-0 top-[28px] h-full w-[2px] bg-gradient-to-b from-${borderColor}-500 to-${borderColor}-300 dark:from-${borderColor}-400 dark:to-${borderColor}-600`}
              />

              {/* Circle with number */}
              <div
                className={`absolute left-[-16px] top-[20px] h-8 w-8 rounded-full 
                  bg-gradient-to-br from-${borderColor}-400 to-${borderColor}-600 
                  flex items-center justify-center
                  shadow-lg shadow-${borderColor}-500/20`}
              >
                <span className="text-white text-sm font-medium">
                  {index + 1}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                <div className="rounded-lg overflow-hidden border border-gray-700/20">
                  <CodeBlock
                    language="bash"
                    filename="Terminal"
                    code={step.code}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Folder Structure Section */}
        <div className="flex flex-col gap-6 mt-8 px-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Expected File Structure
          </h2>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.25rem]">
            <FileTree content={guide.folderStructure} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      const result = await fetchDocument<ProductData>("products", productId);
      if (result && "data" in result) {
        setProduct(result.data);
      }
    };
    getProduct();
  }, [productId]);

  // Special installation guides
  if (productId === "nextjs-installation") {
    return <InstallationGuide type="nextjs" />;
  }

  if (productId === "stripe-installation") {
    return <InstallationGuide type="stripe" />;
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 ">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof product.title === "string" ? product.title : ""}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {typeof product.description === "string" ? product.description : ""}
          </p>
        </div>

        {/* Installations */}
        {product.installations && product.installations.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Installation Steps
            </h2>
            <div className="">
              {" "}
              {product.installations.map((installation, index) => (
                <div
                  key={index}
                  className="space-y-4 border-l border-gray-700 pl-6 lg:pl-8 pb-4"
                >
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {installation.title}
                  </h3>
                  {installation.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {installation.description}
                    </p>
                  )}
                  <div className="rounded-[0.25rem] overflow-hidden">
                    {" "}
                    <CodeBlock
                      language="bash"
                      filename="Terminal"
                      code={installation.code}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Tree */}
        {product.fileTree && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Folder Structure
            </h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.25rem]">
              <FileTree content={product.fileTree} />
            </div>
          </div>
        )}

        {/* Code Files */}
        <div className=" flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Code Files{" "}
          </h2>
          <div className="border rounded-[1.25rem] w-full border-slate-400 dark:border-slate-600 p-4">
            <CodeTabs tabs={product.files as TabData[]} />
          </div>
        </div>

        {/* Current Level */}
        {product.currentLevel && product.currentLevel.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Current Capabilities
            </h2>
            <div className="relative">
              {product.currentLevel.map((item, index) => (
                <div key={index} className="relative pl-8 pb-8 last:pb-0 ml-10">
                  <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600" />
                  <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/20" />
                  <div className="ml-4 rounded-xl px-4  transition-all duration-300 ">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimization Suggestions */}
        {product.optimizationSuggestions &&
          product.optimizationSuggestions.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Optimization Suggestions
              </h2>
              <div className="relative">
                {product.optimizationSuggestions.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-8 last:pb-0 ml-10"
                  >
                    <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-amber-500 to-amber-300 dark:from-amber-400 dark:to-amber-600" />
                    <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20" />
                    <div className="ml-2 rounded-xl px-4  ansition-all duration-300 ">
                      <span className="text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Useful Links */}
        {product.usefulLinks && product.usefulLinks.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Useful Resources
            </h2>
            <div className="relative">
              {product.usefulLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0 ml-10 "
                >
                  <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-indigo-500 to-indigo-300 dark:from-indigo-400 dark:to-indigo-600" />
                  <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/20" />
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center space-x-3 rounded-xl0 px-4 transition-all duration-300 "
                  >
                    <Link2 className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                    <span className="text-gray-600 dark:text-gray-300 w-fit">
                      {link.title}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
