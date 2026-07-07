const skills = [
  "React",
  "Laravel",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "CI/CD",
  "Next.js",
  "Tailwind",
  "Vite",
  "Anthropic SDK",
  "Zod",
  "GitHub Actions",
  "Chart.js",
  "REST API",
  "Automation",
  "Datamodellering",
];

export function SkillsMarquee() {
  return (
    <div className="relative overflow-hidden py-6 w-full">
      <div className="flex animate-scroll-seamless space-x-4">
        {[...skills, ...skills].map((label, i) => (
          <div
            key={`${i < skills.length ? "a" : "b"}-${label}`}
            className="flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 border border-orange-200 dark:border-gray-600"
          >
            <span className="text-sm font-medium gradient-text font-figtree whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
