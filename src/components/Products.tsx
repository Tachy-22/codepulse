"use client";
import { useEffect, useState } from "react";
import { fetchCollection } from "@/actions/firebase/fetchCollection";
import { ProductT } from "@/types";
import { ExpandableCardDemo } from "./SnipetsGallery";

const Products = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const result = await fetchCollection<ProductT>("products");
      if ("items" in result) {
        setProducts(result.items);
      }
      setLoading(false);
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto px-4 pt-[1rem] grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl p-6 space-y-3 h-[25rem]">
            <div className="h-[15rem] bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 pt-[1rem]">
      <ExpandableCardDemo projects={products} />
    </div>
  );
};

export default Products;
