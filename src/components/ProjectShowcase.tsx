"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

export interface ProjectButton {
  label: string;
  href: string;
  external: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  gradientFrom: string;
  gradientTo: string;
  buttons: ProjectButton[];
}

interface ProjectShowcaseProps {
  project: Project;
  id?: string;
}

export function ProjectShowcase({ project, id }: ProjectShowcaseProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.5);

  const gradientClass = cn(
    "bg-gradient-to-r",
    project.gradientFrom,
    project.gradientTo
  );

  return (
    <div
      id={id}
      ref={ref}
      className="h-screen w-full flex items-center justify-center relative pt-[134px] px-[20px] snap-start page-background"
    >
      <div className="absolute top-[134px] left-[20px] right-[20px] bottom-0 rounded-t-2xl">
        <div className="relative overflow-hidden w-full h-full rounded-t-[25px]">
          <img
            src={project.image}
            alt={project.imageAlt}
            className={cn(
              "w-full h-full object-cover transition-all duration-1000 ease-out",
              isInView
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-110"
            )}
            loading="eager"
            decoding="async"
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out rounded-t-[25px]",
            isInView ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(80% 95% at 35% 45%, rgba(0,0,0,0.85) 0%, transparent 85%), radial-gradient(65% 80% at 70% 55%, rgba(0,0,0,0.85) 0%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12 text-center">
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          <div
            className={cn(
              "w-24 h-1 rounded-full mx-auto mb-8",
              gradientClass
            )}
          />
          <h2
            className={cn(
              "text-5xl lg:text-7xl font-bold mb-6 font-lexend bg-clip-text text-transparent leading-tight pb-2",
              gradientClass
            )}
          >
            {project.title}
          </h2>
        </div>

        <div
          className={cn(
            "transition-all duration-700 ease-out delay-200",
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          <p className="text-xl lg:text-2xl leading-relaxed mb-8 font-bold max-w-3xl mx-auto font-figtree text-white">
            {project.description}
          </p>
        </div>

        <div
          className={cn(
            "flex justify-center gap-4 flex-wrap transition-all duration-700 ease-out delay-400",
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          {project.buttons.map((button) => (
            <a
              key={button.href}
              href={button.href}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium h-10 hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-lexend",
                gradientClass
              )}
            >
              <ExternalLink size={20} className="mr-3" />
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
