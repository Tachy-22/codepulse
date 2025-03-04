import { Metadata } from "next";

import { ProductData } from "@/types";

import { fetchCollection } from "@/actions/firebase/fetchCollection";
import Products from "@/components/Products";

export const metadata: Metadata = {
  title: "Code Snippets & Examples | CodePulse",
  description:
    "Browse our collection of high-quality code snippets, solutions, and development examples for your projects",
  openGraph: {
    title: "Code Snippets & Examples | CodePulse",
    description:
      "Browse our collection of high-quality code snippets, solutions, and development examples for your projects",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL ||
          "https://codepulse-kohl.vercel.app"
        }/api/og?title=CodePulse%20Snippets`,
        width: 1200,
        height: 630,
        alt: "CodePulse Code Snippets Collection",
      },
    ],
    type: "website",
    siteName: "CodePulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Snippets & Examples | CodePulse",
    description:
      "Browse our collection of high-quality code snippets, solutions, and development examples for your projects",
    images: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://codepulse-kohl.vercel.app"
      }/api/og?title=CodePulse%20Snippets`,
    ],
  },
};

export default async function ProductsPage() {
  const result = await fetchCollection<ProductData>("products");

  // Handle possible Firebase error
  if (result instanceof Error || !("items" in result)) {
    console.error("Error fetching products:", result);
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Error Loading Snippets
        </h1>
        <p>
          There was an error loading the code snippets. Please try again later.
        </p>
      </div>
    );
  }

  // Extract the items array from the result
  const products = result.items;
  console.log({ products });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-gray-200">
        Code Snippets Library
      </h1>
      <Products />
    </div>
  );
}
