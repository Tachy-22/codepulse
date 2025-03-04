"use client";
import React from "react";
import {
  RiShareBoxLine,
  RiTeamLine,
  RiLockLine,
  RiCodeLine,
} from "react-icons/ri";

const features = [
  {
    icon: <RiCodeLine className="text-4xl text-blue-500" />,
    title: "Seamless Snippet Sharing",
    description:
      "Easily create and share your own code snippets with the community, choosing to keep them public or private based on your preference.",
  },
  {
    icon: <RiTeamLine className="text-4xl text-blue-500" />,
    title: "Community Collaboration",
    description:
      "Engage with fellow developers, exchange knowledge, and discover innovative coding techniques through shared snippets.",
  },
  {
    icon: <RiShareBoxLine className="text-4xl text-blue-500" />,
    title: "Effortless Link Sharing",
    description:
      "Quickly share your code snippets via links, making collaboration easy and efficient for you and your team.",
  },
  {
    icon: <RiLockLine className="text-4xl text-blue-500" />,
    title: "Privacy Options",
    description:
      "Maintain control over your coding assets by choosing who can see your snippets—whether it's just for you or shared with the world.",
  },
];

const Features2 = () => {
  return (
    <div className="w-full py-20 ">
      <h2 className="text-center text-4xl font-bold capitalize mb-16 text-black dark:text-white">
        Discover the Power of{" "}
        <span className="inline-flex text-blue-500 bg-blue-50 rounded-full p-3 whitespace-wrap">
          Code Snippets
        </span>{" "}
        Your Coding Arsenal
      </h2>
      <div className="bg-[url('/features-img.avif')] bg-cover bg-center bg-no-repeat pb-[5rem] relative ">
        <div className="  bg-white dark:bg-stone-100 md:rounded-xl md:w-[80%] max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  z-[100]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg  transition-all duration-300 "
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features2;
