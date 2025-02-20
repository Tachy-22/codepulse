"use client";
import React from "react";

export function Features() {
  return (
    <section className="grid md:grid-cols-2 gap-8 p-6 pb-20 mx-auto max-w-7xl">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Transform Your Coding Experience with CodePulse
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Unlock a world where coding is collaborative, innovative, and efficient.
        </p>
        <ul className="space-y-4">
          {[
            "Personalized Snippet Management - Control the visibility of your code snippets, choosing to share them publicly or keep them private.",
            "Community Engagement - Collaborate with like-minded developers, exchange ideas, and expand your coding knowledge through shared resources.",
            "Instant Sharing - Easily distribute your snippets via links to streamline collaboration with your peers.",
            "Join CodePulse today to enhance your development process and connect with a thriving coding community.",
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-blue-500">•</span>
              <span className="text-gray-700 dark:text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <img
          src="/codefiles-img.PNG"
          alt="CodePulse"
          className="w-full h-full rounded-[1.25rem] shadow-lg"
        />
      </div>
    </section>
  );
}
