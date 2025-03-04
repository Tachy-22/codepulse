import React from "react";

const loading = () => {
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info Skeleton */}
        <div className="space-y-4 w-full">
          <div className="overflow-hidden rounded  w-3/4">
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse "></div>
          </div>

          <div className="overflow-hidden rounded">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse "></div>
          </div>
        </div>

        {/* Installation Steps Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse "></div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border-l border-gray-700 pl-6 lg:pl-8 pb-4 space-y-4"
              >
                <div className="overflow-hidden rounded w-1/3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse "></div>
                </div>

                <div className="overflow-hidden rounded">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse "></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Tree Skeleton */}
        <div className="flex flex-col gap-6 ">
          <div className="overflow-hidden w-48 rounded">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse  "></div>
          </div>

          <div className="overflow-hidden rounded">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse "></div>
          </div>
        </div>

        {/* Code Files Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded w-48">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse "></div>
          </div>

          <div className="overflow-hidden rounded">
            <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
