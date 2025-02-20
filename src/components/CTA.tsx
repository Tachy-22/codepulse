"use client";
import React from "react";

const CTA = () => {
  return (
    <section className="bg-gray-100 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-lg font-bold text-gray-900 dark:text-white">
            Collaboration Opportunities
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Join Our Developer Community Today
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Become a part of an innovative team of developers. Share your
            projects, insights, and ideas with industry leaders and enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
