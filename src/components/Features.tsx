"use client";
import React from "react";

export function Features() {
  return (
    <section className="grid md:grid-cols-2 gap-8 p-6 mx-auto max-w-7xl">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Enhance Your Coding Workflow with CodePulse
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Unlock the power of reusable code snippets to optimize your
          development process. Join us in reshaping the coding landscape.
        </p>
        <ul className="space-y-4">
          {[
            "Access a comprehensive library of code snippets in seconds",
            "Customize snippets to align perfectly with your projects",
            "Share and collaborate on snippets with fellow developers",
            "Enjoy top-notch security and uptime for your coding needs",
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
