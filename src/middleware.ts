// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";
import { handleRedirects } from "@/lib/redirects";
import { handleRewrites } from "@/lib/rewrites";
import { isBot } from "@/lib/bot-detection";
import { logRequest } from "@/lib/logging";
import { isFeatureEnabled } from "@/lib/feature-flags";

export async function middleware(request: NextRequest) {
  // Bot detection
  const userAgent = request.headers.get("user-agent");
  if (isBot(userAgent)) {
    return new NextResponse("Bot traffic not allowed", { status: 403 });
  }

  // Logging and analytics
  logRequest(request);

  // Authentication and authorization
  const { isAuthenticated, role } = await authenticate(request);
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (role !== "ADMIN" && request.nextUrl.pathname.startsWith("/add-product")) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  // Server-side redirects
  const redirectUrl = handleRedirects(request);
  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  // Path rewriting
  const rewriteUrl = handleRewrites(request);
  if (rewriteUrl) {
    return NextResponse.rewrite(rewriteUrl);
  }

  // Feature flagging
  if (
    request.nextUrl.pathname.startsWith("/new-feature") &&
    !isFeatureEnabled("new-feature")
  ) {
    return NextResponse.redirect(new URL("/old-feature", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Apply to all routes
};
