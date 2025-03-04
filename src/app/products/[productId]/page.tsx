import { fetchDocument } from "@/actions/firebase/fetchDocument";
import InstallationGuide from "@/components/InstallationGuide";
import Product from "@/components/Product";
import { ProductData } from "@/types";
import { Metadata } from "next";

type Props = {
  params: { productId: string };
};

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: Props): //  parent: ResolvingMetadata
Promise<Metadata> {
  const productId = params.productId;
  const decodedDocumentId = decodeURIComponent(productId);

  // Handle installation guides with static metadata
  if (productId === "nextjs-installation") {
    return {
      title: "Next.js Installation Guide | CodePulse",
      description:
        "Step-by-step guide for installing and setting up Next.js projects",
      openGraph: {
        title: "Next.js Installation Guide | CodePulse",
        description:
          "Step-by-step guide for installing and setting up Next.js projects",
        images: [
          `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/og?title=Next.js Installation Guide`,
        ],
      },
    };
  }

  if (productId === "stripe-installation") {
    return {
      title: "Stripe Integration Guide | CodePulse",
      description: "Step-by-step guide for integrating Stripe payments",
      openGraph: {
        title: "Stripe Integration Guide | CodePulse",
        description: "Step-by-step guide for integrating Stripe payments",
        images: [
          `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/og?title=Stripe Integration Guide`,
        ],
      },
    };
  }

  // For regular products, fetch data and generate dynamic metadata
  try {
    const product = await fetchDocument<ProductData>(
      "products",
      decodedDocumentId
    );

    if (!product || "code" in product) {
      return {
        title: "Product Not Found | CodePulse",
        description: "The requested code snippet could not be found.",
      };
    }

    const { title, description } = product.data;

    return {
      title: `${title} | CodePulse`,
      description: description || "A code snippet on CodePulse",
      openGraph: {
        title: `${title} | CodePulse`,
        description: description || "A code snippet on CodePulse",
        images: [
          `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/og?id=${productId}&title=${encodeURIComponent(title)}`,
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | CodePulse`,
        description: description || "A code snippet on CodePulse",
        images: [
          `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/og?id=${productId}&title=${encodeURIComponent(title)}`,
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "CodePulse",
      description: "Discover and share code snippets",
    };
  }
}

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
