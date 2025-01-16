import { handleSuccessfulPayment } from "@/actions/stripe/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect("/products");
  }

  const result = await handleSuccessfulPayment(sessionId);

  if (!result.success) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Thank you for your purchase!
        </h1>
        <p className="mb-6">Your code is now available in your account.</p>
        <Link
          href={`/products/${result.productId}/?uid=${result.userId}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          View Code
        </Link>
      </div>
    </div>
  );
}
