import React from "react";
import { Skeleton } from "@heroui/react";

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-16 min-h-screen w-full bg-white dark:bg-gray-950">
      {/* Hero Section Loading */}
      <section className="relative py-20 w-full flex items-center justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-4 w-full mx-auto mb-3" />
            <Skeleton className="h-4 w-5/6 mx-auto mb-12" />
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Loading */}
      <section className="py-16 relative">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <Skeleton className="h-14 w-14 mb-6" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Snippets Section Loading */}
      <section className="py-16 relative">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* How It Works Section Loading */}
      <section className="py-16 relative">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-1/3 mx-auto mb-6" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-20 w-20 rounded-full mx-auto mb-8" />
                <Skeleton className="h-6 w-1/2 mx-auto mb-3" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Loading */}
      <section className="py-16 relative">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Loading */}
      <section className="py-16 relative">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <Skeleton className="h-10 w-5/6 mx-auto mb-6" />
          <Skeleton className="h-4 w-full mx-auto mb-2" />
          <Skeleton className="h-4 w-5/6 mx-auto mb-10" />
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </section>
    </div>
  );
}
