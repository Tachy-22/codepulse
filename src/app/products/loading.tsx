import React from "react";

const loading = () => {
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info Skeleton */}
        <div className="space-y-4">
          <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full animate-shimmer bg-[length:200%_100%]"></div>
        </div>

        {/* Installation Steps Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border-l border-gray-700 pl-6 lg:pl-8 pb-4 space-y-4"
              >
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-1/3 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* File Tree Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"></div>
        </div>

        {/* Code Files Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-48 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="h-60 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
