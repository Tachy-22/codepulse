// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";

export default function HeroUiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
