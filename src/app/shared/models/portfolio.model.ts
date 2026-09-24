export type Theme = 'dark' | 'light';

export interface BrandIcon {
  title: string;
  slug: string;
  hex: string;
  /** Path SVG (simple-icons). Omitir si usas imageSrc. */
  path?: string;
  /** Logo raster/SVG en /public (marcas con branding oficial). */
  imageSrc?: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export type TimelineType = 'work' | 'education';

export interface TimelineEntry {
  period: string;
  title: string;
  company: string;
  description: string;
  type: TimelineType;
  tags: string[];
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'ai';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: BrandIcon;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: BrandIcon;
  gradient: string;
  glyph: string;
  github: string;
  demo?: string;
  year: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: BrandIcon;
}
