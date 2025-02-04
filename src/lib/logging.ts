// lib/logging.ts
import { NextRequest } from "next/server";

export function logRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log request details
  console.log(`Request to ${pathname} from IP: ${request.ip}`);

  // Example: Logging for analytics
  if (pathname.startsWith("/products")) {
    console.log("Product page accessed");
  }
}
