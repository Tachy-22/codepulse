"use server";

import Stripe from "stripe";
import { updateDocument } from "../firebase/updateDocument";
import { fetchDocument } from "../firebase/fetchDocument";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_BASE_URL environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.trim().replace(/\/$/, "");

export async function createCheckoutSession(productId: string, userId: string) {
  try {
    if (!baseUrl) {
      throw new Error("Base URL is not properly configured");
    }

    console.log("Fetching product:", productId);
    const productResponse = await fetchDocument<{
      title: string;
      description: string;
      price: number;
      imageUrl: string;
    }>("products", productId);

    console.log("Product response:", productResponse);

    if (!productResponse || "code" in productResponse) {
      throw new Error("Failed to fetch product details");
    }

    const product = productResponse.data;

    if (!product.title || !product.price) {
      throw new Error("Invalid product data: missing required fields");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title || "Untitled Product",
              description: product.description || "No description available",
              images: product.imageUrl ? [product.imageUrl] : undefined,
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents and ensure integer
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/products`,
      metadata: {
        productId,
        userId,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Detailed checkout error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    };
  }
}

export async function handleSuccessfulPayment(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const { productId, userId } = session.metadata!;
    const userResponse = await fetchDocument("users", userId);
    if (!userResponse || 'code' in userResponse) {
      throw new Error('Failed to fetch user data');
    }
    const currentPurchases = userResponse.data.purchases as string[] || [];
    
    await updateDocument(
      "users",
      userId,
      {
        purchases: [...currentPurchases, productId],
      },
      "/products"
    );

    return { success: true, productId, userId };
  } catch (error) {
    return { error: `${error}: Failed to create checkout session` };
  }
}
