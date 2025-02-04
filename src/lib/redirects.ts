// lib/redirects.ts
import { NextRequest } from "next/server";

export function handleRedirects(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect based on locale
  if (pathname.startsWith("/en")) {
    return new URL("/fr", request.url);
  }

  // Redirect based on user role
  const role = request.cookies.get("role")?.value;
  if (pathname.startsWith("/admin") && role !== "admin") {
    return new URL("/dashboard", request.url);
  }

  return null; // No redirect
}
