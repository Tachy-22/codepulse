// lib/rewrites.ts
import { NextRequest } from "next/server";

export function handleRewrites(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A/B testing example
  if (pathname === "/home") {
    const variant = Math.random() < 0.5 ? "a" : "b"; // Randomly assign a variant
    return new URL(`/home/${variant}`, request.url);
  }

  // Legacy path support
  if (pathname === "/old-path") {
    return new URL("/new-path", request.url);
  }

  return null; // No rewrite
}
