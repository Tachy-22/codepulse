import React from "react";
import SideNavigation from "@/components/SideNavigation";
import { fetchCollection } from "@/actions/firebase/fetchCollection";
import { ProductT } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
  const result = await fetchCollection<ProductT>("products");
  const products = 'items' in result ? result.items : [];

  return (
    <div className="flex max-w-[90rem] mx-auto max-w-screen overflow-x-hidden px-3  o">
      <SideNavigation products={products} />
      <main className="p-2 lg:p-6 w-full flex-1">{children}</main>
    </div>
  );
};

export default layout;
