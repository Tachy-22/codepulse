"use client";
import CodeTabs from "@/components/CodeTabs";
import React from "react";
import { Link2 } from "lucide-react";
import FileTree from "@/components/FileTree";
import CodeBlock from "@/components/ui/code-block";
import { ProductData } from "@/types";

const LoadingSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info Skeleton */}
        <div className="space-y-4">
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>

        {/* Installation Steps Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border-l border-gray-700 pl-6 lg:pl-8 pb-4 space-y-4"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* File Tree Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Code Files Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Product = ({
  product,
}: {
  product: ProductData;
}) => {
  const {
    description,
    fileTree,
    usefulLinks,
    title,
    installations,
    files,
    currentLevel,
    optimizationSuggestions,
  } = product;
  if (!product) return <LoadingSkeleton />;

  return (
    <div className="p-4 ">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof title === "string" ? title : ""}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {typeof description === "string" ? description : ""}
          </p>
        </div>

        {/* Installations */}
        {installations && installations.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Installation Steps
            </h2>
            <div className="">
              {" "}
              {installations.map((installation, index) => (
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
        {fileTree && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Folder Structure
            </h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.25rem]">
              <FileTree content={fileTree} />
            </div>
          </div>
        )}

        {/* Code Files */}
        {files && (
          <div className=" flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Code Files{" "}
            </h2>
            <div className="border rounded-[1.25rem] w-full border-slate-400 dark:border-slate-600 p-4">
              <CodeTabs tabs={files as TabData[]} />
            </div>
          </div>
        )}

        {/* Current Level */}
        {currentLevel && currentLevel.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Current Capabilities
            </h2>
            <div className="relative">
              {currentLevel.map((item, index) => (
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
        {optimizationSuggestions && optimizationSuggestions.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Optimization Suggestions
            </h2>
            <div className="relative">
              {optimizationSuggestions.map((item, index) => (
                <div key={index} className="relative pl-8 pb-8 last:pb-0 ml-10">
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
        {usefulLinks && usefulLinks.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Useful Resources
            </h2>
            <div className="relative">
              {usefulLinks.map((link, index) => (
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
