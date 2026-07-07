import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { EventsSection } from "@/components/EventsSection";

export default function Home() {
  return (
    <div className="scroll-smooth overflow-y-scroll h-screen snap-y snap-mandatory">
      <SiteHeader />
      <HeroSection />
      <ProjectsSection />
      <ArticlesSection />
      <EventsSection />
    </div>
  );
}
