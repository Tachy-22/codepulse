"use client";
import React, { useState } from "react";
import { ProductT } from "@/types";
import { createCheckoutSession } from "@/actions/stripe/stripe";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";

interface ProductCardProps {
  product: ProductT;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.userSlice);

  const hasPurchased = user?.purchases?.includes(product.id);

  const handlePurchase = async () => {
    if (!user?.id) {
      setError("Please login to purchase");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log({ product, user });
      const result = await createCheckoutSession(product.id, user?.id);

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.log("Failed to create checkout session");
      }
    } catch (err) {
      setError("An error occurred while processing your request");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="my-2">{product.description}</p>
      <p className="font-mono">${(product.price / 100).toFixed(2)}</p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {hasPurchased ? (
        <div>
          <span className="text-green-600 text-sm block mb-2">✓ Purchased</span>
          <Link
            href={`/products/${product.id}`}
            className="mt-2 px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600"
          >
            View Code
          </Link>
        </div>
      ) : (
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`mt-4 px-4 py-2 rounded text-white ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Processing..." : "Get Code"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
