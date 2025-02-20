import Community from "@/components/Community";
import CTA from "@/components/CTA";
import { Features } from "@/components/Features";
import Features2 from "@/components/Features2";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 overflow-y-hidden">
      <Hero />
      <Community />
      <Features2 />
      <Features />
      <CTA />
    </div>
  );
}
