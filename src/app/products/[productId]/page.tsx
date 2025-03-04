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
}: Props): Promise<Metadata> {
  const productId = params.productId;
  const decodedDocumentId = decodeURIComponent(productId);
  
  // Ensure we have absolute URLs for images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' // Replace with your actual production domain
      : 'http://localhost:3000');

  // Handle installation guides with static metadata
  if (productId === "nextjs-installation") {
    const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent("Next.js Installation Guide")}`;
    
    return {
      title: "Next.js Installation Guide | CodePulse",
      description: "Step-by-step guide for installing and setting up Next.js projects",
      openGraph: {
        title: "Next.js Installation Guide | CodePulse",
        description: "Step-by-step guide for installing and setting up Next.js projects",
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Next.js Installation Guide"
        }],
        siteName: "CodePulse",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Next.js Installation Guide | CodePulse",
        description: "Step-by-step guide for installing and setting up Next.js projects",
        images: [imageUrl],
        creator: "@your_twitter_handle", // Replace with your Twitter handle
      },
    };
  }

  // Similar update for Stripe installation
  if (productId === "stripe-installation") {
    const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent("Stripe Integration Guide")}`;
    
    return {
      title: "Stripe Integration Guide | CodePulse",
      description: "Step-by-step guide for integrating Stripe payments",
      openGraph: {
        title: "Stripe Integration Guide | CodePulse",
        description: "Step-by-step guide for integrating Stripe payments",
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Stripe Integration Guide"
        }],
        siteName: "CodePulse",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Stripe Integration Guide | CodePulse",
        description: "Step-by-step guide for integrating Stripe payments",
        images: [imageUrl],
        creator: "@your_twitter_handle", // Replace with your Twitter handle
      },
    };
  }
  
  // For regular products, fetch data and generate dynamic metadata
  try {
    const product = await fetchDocument<ProductData>("products", decodedDocumentId);
    
    if (!product || "code" in product) {
      return {
        title: "Product Not Found | CodePulse",
        description: "The requested code snippet could not be found."
      };
    }
    
    const { title, description } = product.data;
    const imageUrl = `${baseUrl}/api/og?id=${productId}&title=${encodeURIComponent(title)}`;
    
    return {
      title: `${title} | CodePulse`,
      description: description || "A code snippet on CodePulse",
      openGraph: {
        title: `${title} | CodePulse`,
        description: description || "A code snippet on CodePulse",
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }],
        siteName: "CodePulse",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | CodePulse`,
        description: description || "A code snippet on CodePulse",
        images: [imageUrl],
        creator: "@your_twitter_handle", // Replace with your Twitter handle
      },
      alternates: {
        canonical: `${baseUrl}/products/${productId}`
      }
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "CodePulse",
      description: "Discover and share code snippets"
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
