import React from "react";
import { Skeleton } from "@heroui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-56 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-gray-300 rounded-xl p-4 space-y-3">
            <Skeleton className="h-[15rem] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
