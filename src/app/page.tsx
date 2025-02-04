import { Features } from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <Features />
    </div>
  );
}
