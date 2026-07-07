import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { cn } from "@/lib/utils";
import { caseProjects, getCaseProject } from "@/data/projects";

export function generateStaticParams() {
  return caseProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseProject(slug);
  if (!project) notFound();

  const gradient = cn("bg-gradient-to-r", project.gradientFrom, project.gradientTo);

  return (
    <>
      <SiteHeader toggleRowClassName="max-w-4xl mx-auto px-8" />

      <div className="pt-[calc(64px+2rem)] min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-figtree mb-10"
          >
            <ArrowLeft size={18} />
            Tillbaka till projekt
          </Link>

          <div className={cn("w-24 h-1 rounded-full mb-8", gradient)} />
          <h1
            className={cn(
              "text-5xl lg:text-6xl font-bold mb-4 font-lexend bg-clip-text text-transparent leading-tight pb-2",
              gradient
            )}
          >
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-figtree mb-12">
            {project.tagline}
          </p>

          <div className="space-y-10 font-figtree">
            <section>
              <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white font-lexend">
                Problemet
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white font-lexend">
                Lösningen
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white font-lexend">
                Vad det visar
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.demonstrates}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white font-lexend">
                Teknik
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border px-3 py-1 font-semibold text-sm bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-14">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:opacity-90 transition-all font-lexend",
                gradient
              )}
            >
              Kontakta mig om projektet
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
