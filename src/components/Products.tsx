"use client";

import { ExpandableCardDemo } from "./SnipetsGallery";
import { useAppSelector } from "@/lib/redux/hooks";

const Products = () => {
  const { products } = useAppSelector((state) => state.productSlice);
  

  return (
    <div className="w-full mx-auto px-4 pt-[1rem]">
      <ExpandableCardDemo projects={products} />
    </div>
  );
};

export default Products;
