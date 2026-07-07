"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Mail, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

const projectLinks: ProjectLink[] = [
  { label: "Fairway – Golf scorecard", href: "/projects/fairway" },
  { label: "VenueFlow – Bokningssystem", href: "/projects/venueflow" },
  { label: "FX Monitor – Data pipeline", href: "/projects/fx-monitor" },
  { label: "Lördagsgolf – Publik sajt", href: "/projects/lordagsgolf" },
];

type IconComponent = ComponentType<{ size?: number; className?: string }>;

interface SocialLink {
  label: string;
  href: string;
  Icon: IconComponent;
}

const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexander-%C3%A5hman/", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
  { label: "Email", href: "mailto:alexhvahman@gmail.com", Icon: Mail },
];

const navLinkClass =
  "transition-colors text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium";
const navLinkActiveClass = "transition-colors text-orange-600 font-bold";

interface SiteHeaderProps {
  toggleRowClassName?: string;
}

export function SiteHeader({
  toggleRowClassName = "max-w-7xl mx-auto px-6",
}: SiteHeaderProps = {}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link className="flex items-center gap-2.5" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="Alexander Åhman logotyp"
                  className="w-8 h-8 rounded-lg"
                  width={32}
                  height={32}
                />
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-lexend">
                  Alexander Åhman
                </h1>
              </Link>
            </div>

            {!isMobile && (
              <div className="flex items-center space-x-8 font-figtree">
                <Link
                  className={pathname === "/" ? navLinkActiveClass : navLinkClass}
                  href="/"
                >
                  home
                </Link>

                <div className="relative group">
                  <span className="transition-colors cursor-pointer text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">
                    projects
                  </span>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {projectLinks.map((link) =>
                        link.external ? (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={14} />
                          </Link>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  className={pathname === "/about" ? navLinkActiveClass : navLinkClass}
                  href="/about"
                >
                  about
                </Link>
                <Link href="/contact" className={navLinkClass}>
                  connect
                </Link>
              </div>
            )}

            {isMobile && (
              <button
                type="button"
                aria-label="Open navigation"
                className="p-2"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="text-slate-700 dark:text-slate-300" />
              </button>
            )}

            <div className="flex items-center space-x-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed top-[88px] left-0 right-0 z-30 transition-all duration-500 ease-in-out opacity-100 transform translate-y-0">
        <div className={`${toggleRowClassName} flex items-center justify-between`}>
          <ThemeToggle />
        </div>
      </div>

      {isMobile && drawerOpen && (
        <MobileNavDrawer pathname={pathname} onClose={() => setDrawerOpen(false)} />
      )}
    </>
  );
}

const mobileActiveClass =
  "bg-orange-50 dark:bg-gray-800 text-orange-600 font-bold rounded-xl px-4 py-3";
const mobileInactiveClass = "px-4 py-3 text-slate-600 dark:text-slate-400";

function MobileNavDrawer({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] font-figtree">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 h-full w-[72%] max-w-[360px] bg-white dark:bg-gray-900 shadow-xl flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-orange-600 font-lexend">Navigation</h2>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="p-2"
          >
            <X className="text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className={pathname === "/" ? mobileActiveClass : mobileInactiveClass}
          >
            home
          </Link>

          <span className="px-4 pt-4 pb-1 text-sm text-slate-500 dark:text-slate-400">
            projects
          </span>
          <div className="flex flex-col pl-4">
            {projectLinks.map((link) =>
              link.external ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 py-3"
                >
                  {link.label}
                  <ExternalLink size={14} />
                </Link>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="text-slate-600 dark:text-slate-400 py-3"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <Link
            href="/about"
            onClick={onClose}
            className={pathname === "/about" ? mobileActiveClass : mobileInactiveClass}
          >
            about
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="px-4 py-3 text-slate-600 dark:text-slate-400"
          >
            connect
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * lucide-react in this project's dependency version ships no brand/logo
 * icons (Instagram, Linkedin, etc. were dropped). These local outlines
 * match lucide's stroke conventions (24x24 viewBox, strokeWidth 2, round
 * caps/joins) so they sit flush with the Mail icon from lucide-react.
 */
function LinkedInIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
