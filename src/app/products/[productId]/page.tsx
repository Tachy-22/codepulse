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
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://codepulse-kohl.vercel.app"
      : "http://localhost:3000");

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
        url: `${baseUrl}/products/nextjs-installation`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Next.js Installation Guide | CodePulse",
        description: "Step-by-step guide for installing and setting up Next.js projects",
        images: [imageUrl],
        creator: "@codepulseapp",
      },
    };
  }

  if (productId === "stripe-installation") {
    // Similar implementation for stripe-installation
    // ...existing code...
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
    const productUrl = `${baseUrl}/products/${productId}`;
    
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
        url: productUrl,
        publishedTime: new Date().toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | CodePulse`,
        description: description || "A code snippet on CodePulse",
        images: [imageUrl],
        creator: "@codepulseapp",
      },
      alternates: {
        canonical: productUrl
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

// Product page component with structured data
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const productId = params.productId;
  const decodedDocumentId = decodeURIComponent(productId);

  // Special guide cases
  if (productId === "nextjs-installation") {
    return (
      <>
        <InstallationGuide type="nextjs" />
        <StructuredData 
          title="Next.js Installation Guide"
          description="Step-by-step guide for installing and setting up Next.js projects"
          datePublished={new Date().toISOString()}
          type="TechArticle"
        />
      </>
    );
  }

  if (productId === "stripe-installation") {
    return (
      <>
        <InstallationGuide type="stripe" />
        <StructuredData 
          title="Stripe Integration Guide"
          description="Step-by-step guide for integrating Stripe payments"
          datePublished={new Date().toISOString()}
          type="TechArticle"
        />
      </>
    );
  }

  // Regular product fetch
  const product = await fetchDocument<ProductData>(
    "products",
    decodedDocumentId
  );

  if (!product || "code" in product) return null;
  
  const productData = { ...product.data, id: decodedDocumentId };
  
  return (
    <>
      <Product product={productData} />
      <StructuredData 
        title={productData.title}
        description={productData.description}
        datePublished={productData.createdAt || new Date().toISOString()}
        type="SoftwareSourceCode"
       // codeRepo={productData.github || null}
      />
    </>
  );
};

// Structured Data component for JSON-LD
const StructuredData = ({ 
  title, 
  description, 
  datePublished,
  type,
  codeRepo = null
}: {
  title: string;
  description: string;
  datePublished: string;
  type: "TechArticle" | "SoftwareSourceCode";
  codeRepo?: string | null;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://codepulse-kohl.vercel.app'
      : 'http://localhost:3000');
      
  let jsonLd;
  
  if (type === "TechArticle") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Organization",
        "name": "CodePulse"
      },
      "datePublished": datePublished,
      "publisher": {
        "@type": "Organization",
        "name": "CodePulse",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      }
    };
  } else {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": title,
      "description": description,
      "datePublished": datePublished,
      "codeRepository": codeRepo || undefined,
      "author": {
        "@type": "Organization",
        "name": "CodePulse"
      },
      "programmingLanguage": {
        "@type": "ComputerLanguage",
        "name": "Multiple"
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProductPage;
