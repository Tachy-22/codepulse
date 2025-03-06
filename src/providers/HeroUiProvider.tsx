// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export default function HeroUiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      {" "}
      <ToastProvider placement={"bottom-right"} />
      {children}
    </HeroUIProvider>
  );
}
