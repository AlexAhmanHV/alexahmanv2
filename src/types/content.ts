export interface NavProjectLink {
  label: string;
  href?: string;
  external?: boolean;
}

export interface ChatQuestion {
  text: string;
}

export interface SkillTag {
  label: string;
}

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

export interface Article {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  readTime: string;
  status: "active" | "in-progress";
  ctaLabel: string;
  href?: string;
}

export interface EventItem {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeVariant: "online" | "local";
  month: string;
  day: string;
  date: string;
  time: string;
  location: string;
  rsvpHref?: string;
}
