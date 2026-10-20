import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Timeline from "@/components/site/Timeline";
import Comparison from "@/components/site/Comparison";
import Video from "@/components/site/Video";
import Finale from "@/components/site/Finale";

export default function Home() {
  return (
    <div className="min-h-screen bg-museum text-foreground">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Comparison />
        <Video />
        <Finale />
      </main>
      <Toaster />
    </div>
  );
}
