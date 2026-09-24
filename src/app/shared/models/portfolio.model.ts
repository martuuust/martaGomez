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

/** Agrupación por uso real (no por buzzword). */
export type SkillGroup = 'daily' | 'worked' | 'exploring' | 'ai';

export interface Skill {
  name: string;
  category: SkillCategory;
  group: SkillGroup;
  icon: BrandIcon;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  /** Caso de estudio */
  problem: string;
  whatIDid: string;
  result: string;
  stack: string[];
  /** Captura en /public/projects/… */
  image?: string;
  gradient: string;
  glyph: string;
  year: string;
  github?: string;
  demo?: string;
  /** false = falta contenido de Marta (no inventar). */
  complete: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: BrandIcon;
}
