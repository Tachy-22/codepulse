import React from "react";
import SideNavigation from "@/components/SideNavigation";
import { fetchCollection } from "@/actions/firebase/fetchCollection";
import { ProductData } from "@/types";
import { cookies } from 'next/headers';

interface LayoutProps {
  children: React.ReactElement;
}

const layout = async ({ children }: LayoutProps) => {
  const userId = cookies().get('userId')?.value;
  
  const whereClause: [string, "==", string][] = [["privacy", "==", "PUBLIC"]];
  if (userId) {
    whereClause.push(["ownerId", "==", userId]);
  }

  const result = await fetchCollection<ProductData>("products", {
    whereClause,
    exclude: [
      "files",
      "fileTree",
      "optimizationSuggestions:",
      "installations",
      "usefulLinks",
    ],
  });
  const products = "items" in result ? result.items : [];

  return (
    <div className="flex max-w-[90rem] mx-auto overflow-x-hidden px-3">
      <SideNavigation products={products} />
      <main className="p-2 lg:p-6 w-full flex-1 max-h-[calc(100vh-0rem)] overflow-y-auto md: border-l dark:border-gray-800">
        {children}
      </main>
    </div>
  );
};
export default layout;
