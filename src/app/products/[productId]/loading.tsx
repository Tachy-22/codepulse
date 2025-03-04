import React from 'react';
import { Skeleton } from "@heroui/skeleton";

export default function ProductLoading() {
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full">
        {/* Basic Info Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-6 w-full" />
        </div>

        {/* Installation Steps Skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-7 w-48" />
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border-l border-gray-700 pl-6 lg:pl-8 pb-4 space-y-4"
              >
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* File Tree Skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-40 w-full rounded-[1.25rem]" />
        </div>

        {/* Code Files Skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-60 w-full rounded-[1.25rem]" />
        </div>
      </div>
    </div>
  );
}
