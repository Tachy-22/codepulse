import { fetchDocument } from "@/actions/firebase/fetchDocument";
import InstallationGuide from "@/components/InstallationGuide";
import Product from "@/components/Product";
import { ProductData } from "@/types";
import React from "react";

const page = async ({ params }: { params: { productId: string } }) => {
  const productId = params.productId;
  const decodedDocumentId = decodeURIComponent(productId);

  if (productId === "nextjs-installation") {
    return <InstallationGuide type="nextjs" />;
  }

  if (productId === "stripe-installation") {
    return <InstallationGuide type="stripe" />;
  }

  const product = await fetchDocument<ProductData>(
    "products",
    decodedDocumentId
  );

  if (!product || "code" in product) return null;
  return <Product product={{ ...product.data, id: decodedDocumentId }} />;
};

export default page;
