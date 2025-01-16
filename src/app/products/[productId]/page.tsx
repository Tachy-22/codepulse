import Product from "@/components/Product";
import React from "react";

const page = async ({ params }: { params: { productId: string } }) => {
  return <Product productId={params.productId} />;
};

export default page;
