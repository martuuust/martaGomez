import type {
  NavLink,
  Project,
  Skill,
  SocialLink,
  Stat,
  TimelineEntry,
} from '../models/portfolio.model';
import {
  siAngular,
  siBootstrap,
  siClaude,
  siCss,
  siCursor,
  siDocker,
  siDolibarr,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siGoogle,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siOpenjdk,
  siPhp,
  siTypescript,
  siVirtualbox,
} from 'simple-icons';

const siLinkedin: Skill['icon'] = {
  title: 'LinkedIn',
  slug: 'linkedin',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
};

/** Iconos no disponibles en simple-icons (marcas retiradas). */
const siAmazonaws: Skill['icon'] = {
  title: 'Amazon AWS',
  slug: 'amazonaws',
  hex: 'FF9900',
  path: 'M18.75 18.5c-2.2 1.28-5.39 1.96-8.13 1.96-3.85 0-7.32-1.42-9.95-3.79-.21-.19-.02-.45.23-.3 2.86 1.66 6.39 2.66 10.04 2.66 2.46 0 5.17-.51 7.66-1.57.38-.16.69.25.15.54zm1.12-1.28c-.28-.36-1.86-.17-2.57-.09-.21.03-.24-.16-.05-.3 1.24-.87 3.28-.62 3.51-.33.24.3-.06 2.35-1.22 3.33-.18.15-.35.07-.27-.11.26-.6.85-1.95.6-2.5zM6.76 11.99c0 .8.08 1.45.25 1.96.16.5.42.92.76 1.24.34.32.77.56 1.28.71l-.6 1.8a4.3 4.3 0 0 1-1.7-.75 3.7 3.7 0 0 1-1.2-1.4A5.2 5.2 0 0 1 5 12c0-.9.14-1.7.41-2.4.28-.7.67-1.3 1.18-1.78.5-.48 1.11-.85 1.82-1.1.7-.26 1.48-.38 2.33-.38.8 0 1.5.12 2.1.37.6.24 1.08.58 1.47 1.02V6.3h2.3v10.6h-2.3v-1.3a3.4 3.4 0 0 1-1.35 1.15c-.55.28-1.2.42-1.95.42-1.05 0-1.95-.2-2.7-.6-.75-.4-1.32-.98-1.72-1.74-.4-.76-.6-1.68-.6-2.76zm5.4-.95c0-.55-.1-1.02-.28-1.42a2.1 2.1 0 0 0-.78-.92 2 2 0 0 0-1.12-.33c-.45 0-.84.11-1.18.33-.34.22-.6.53-.78.92-.18.4-.28.86-.28 1.4 0 .55.1 1.03.28 1.42.18.4.44.7.78.92.34.22.73.33 1.18.33.42 0 .8-.1 1.12-.32.33-.22.6-.52.78-.91.18-.4.28-.87.28-1.42z',
};

const siOpenai: Skill['icon'] = {
  title: 'OpenAI',
  slug: 'openai',
  hex: '412991',
  path: 'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.365-1.973V11.6a.766.766 0 0 0 .388.681l5.834 3.369-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.835-3.377L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.146.087-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
};

/** Logos oficiales en public/icons (press kit Antigravity / gstatic Stitch). */
const siAntigravity: Skill['icon'] = {
  title: 'Antigravity',
  slug: 'antigravity',
  hex: '4285F4',
  imageSrc: '/icons/antigravity.png',
};

const siStitch: Skill['icon'] = {
  title: 'Stitch',
  slug: 'stitch',
  hex: 'EA4335',
  imageSrc: '/icons/stitch.png',
};

/** Datos alineados con LinkedIn: https://www.linkedin.com/in/marta-gómez-41a4a72a9/ */
export const PERSON = {
  name: 'Marta Gómez',
  firstName: 'Marta',
  lastName: 'Gómez',
  role: 'Desarrolladora Web',
  /** Sin email público verificado: contacto vía LinkedIn. */
  email: '',
  location: 'Chiva, Valencia, España',
  available: true,
  /** Frases concretas; sin placeholders de LinkedIn. */
  bio: [
    'Desarrolladora web con Angular 21, PHP, Express y SQL: aplicaciones con ERP, APIs entre servicios y evolución hacia arquitectura hexagonal.',
    'Formada en DAW y SMIR en el CIPFP Cheste. Antes trabajé en soporte técnico en ANDREU TOPS SL.',
    'Publico proyectos en GitHub y uso IA como apoyo al desarrollo, no como sustituto del criterio técnico.',
  ],
  linkedin: 'https://www.linkedin.com/in/marta-g%C3%B3mez-41a4a72a9/',
};

export const NAV_LINKS: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export const EXPERIENCE: TimelineEntry[] = [
  {
    period: 'mar. 2026 — Actualidad',
    title: 'Desarrolladora Web',
    company: 'Onna Digital',
    description:
      'Participo en el desarrollo de una aplicación orientada al acceso para distribuidores. Trabajo con Dolibarr como ERP para la gestión y almacenamiento de la información. Colaboro en GitLab con ramas y buenas prácticas de control de versiones. Stack: Angular 21, PHP, Express y SQL; desarrollo y consumo de endpoints entre servicios. Evolución de la arquitectura desde un enfoque por capas (DAL y Domain) hacia arquitectura hexagonal, mejorando organización, escalabilidad y mantenibilidad.',
    type: 'work',
    tags: ['Angular 21', 'PHP', 'Express', 'SQL', 'Dolibarr', 'GitLab'],
  },
  {
    period: 'mar. 2024 — jun. 2024',
    title: 'Técnico en Sistemas Microinformáticos y Redes',
    company: 'ANDREU TOPS SL',
    description:
      'Gestión y resolución de incidencias técnicas, montaje y reparación de equipos, instalación y configuración de sistemas operativos y software corporativo, administración de usuarios en SAP y configuración de videoconferencia en salas.',
    type: 'work',
    tags: ['SAP', 'Sistemas operativos', 'Hardware', 'Soporte'],
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    period: '2024 — 2026',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Web (DAW)',
    company: 'CIPFP Cheste',
    description:
      'Formación profesional de grado superior en desarrollo de aplicaciones web: programación, bases de datos, entornos de desarrollo y diseño de interfaces.',
    type: 'education',
    tags: ['Java', 'JavaScript', 'PHP', 'SQL', 'HTML/CSS'],
  },
  {
    period: '2022 — 2024',
    title: 'Técnico en Sistemas Microinformáticos y Redes (SMIR)',
    company: 'CIPFP Cheste',
    description:
      'Formación profesional de grado medio en sistemas microinformáticos y redes: montaje de equipos, sistemas operativos, redes y seguridad.',
    type: 'education',
    tags: ['Redes', 'Sistemas operativos', 'Hardware', 'Seguridad'],
  },
];

/**
 * Stack real según GitHub + LinkedIn/Onna.
 * group: daily (Onna) | worked (FP/proyectos) | exploring | ai (peso visual menor).
 */
export const SKILLS: Skill[] = [
  // Uso a diario — Onna
  { name: 'Angular', category: 'frontend', group: 'daily', icon: siAngular },
  { name: 'PHP', category: 'backend', group: 'daily', icon: siPhp },
  { name: 'Express', category: 'backend', group: 'daily', icon: siExpress },
  { name: 'MySQL', category: 'backend', group: 'daily', icon: siMysql },
  { name: 'Dolibarr', category: 'backend', group: 'daily', icon: siDolibarr },
  { name: 'Git', category: 'tools', group: 'daily', icon: siGit },
  { name: 'GitLab', category: 'tools', group: 'daily', icon: siGitlab },
  // He trabajado con — FP / repos
  { name: 'JavaScript', category: 'frontend', group: 'worked', icon: siJavascript },
  { name: 'HTML5', category: 'frontend', group: 'worked', icon: siHtml5 },
  { name: 'CSS3', category: 'frontend', group: 'worked', icon: siCss },
  { name: 'Bootstrap', category: 'frontend', group: 'worked', icon: siBootstrap },
  { name: 'Java', category: 'backend', group: 'worked', icon: siOpenjdk },
  { name: 'MongoDB', category: 'backend', group: 'worked', icon: siMongodb },
  // Explorando — menor frecuencia
  { name: 'AWS', category: 'tools', group: 'exploring', icon: siAmazonaws },
  { name: 'Docker', category: 'tools', group: 'exploring', icon: siDocker },
  { name: 'Figma', category: 'tools', group: 'exploring', icon: siFigma },
  { name: 'VirtualBox', category: 'tools', group: 'exploring', icon: siVirtualbox },
  // IA — grupo propio, sin el mismo peso visual
  { name: 'OpenAI', category: 'ai', group: 'ai', icon: siOpenai },
  { name: 'Gemini', category: 'ai', group: 'ai', icon: siGooglegemini },
  { name: 'Claude', category: 'ai', group: 'ai', icon: siClaude },
  { name: 'Google AI Studio', category: 'ai', group: 'ai', icon: siGoogle },
  { name: 'Cursor', category: 'ai', group: 'ai', icon: siCursor },
  { name: 'Antigravity', category: 'ai', group: 'ai', icon: siAntigravity },
  { name: 'Stitch', category: 'ai', group: 'ai', icon: siStitch },
];

/**
 * Stats: sin cifras de relleno.
 * TODO(Marta): confirma si quieres mostrar repos públicos u otros métricas reales.
 */
export const STATS: Stat[] = [];

/** Repos públicos reales: github.com/martuuust */
export const PROJECTS: Project[] = [
  {
    id: 'cinematch',
    title: 'CineMatch',
    tagline: 'Proyecto web en TypeScript',
    description:
      'Aplicación web pública en el perfil de GitHub. Stack principal en TypeScript, con demo desplegada en Vercel.',
    highlights: ['Repositorio público en GitHub', 'Demo en Vercel', 'TypeScript'],
    tags: ['TypeScript'],
    icon: siTypescript,
    gradient: 'from-violet-600 via-purple-500 to-cyan-400',
    glyph: 'CM',
    github: 'https://github.com/martuuust/cineMatch',
    demo: 'https://cine-match-psi.vercel.app',
    year: '2026',
  },
  {
    id: 'proyecto-intermodular',
    title: 'Proyecto Intermodular',
    tagline: 'Proyecto académico en TypeScript',
    description:
      'Repositorio público del proyecto intermodular (formación). Código en TypeScript disponible en GitHub.',
    highlights: ['Repositorio público en GitHub', 'TypeScript'],
    tags: ['TypeScript'],
    icon: siTypescript,
    gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
    glyph: 'PI',
    github: 'https://github.com/martuuust/ProyectoIntermodular',
    year: '2025',
  },
  {
    id: 'martagomez',
    title: 'Portfolio Marta Gómez',
    tagline: 'Portfolio personal',
    description:
      'Portfolio personal de desarrollo web. Angular 21 (zoneless, signals), Tailwind CSS y animaciones con GSAP.',
    highlights: ['Angular 21', 'Tailwind CSS', 'GSAP'],
    tags: ['Angular', 'Tailwind', 'GSAP'],
    icon: siAngular,
    gradient: 'from-fuchsia-600 via-purple-500 to-violet-400',
    glyph: 'MG',
    github: 'https://github.com/martuuust/martaGomez',
    year: '2026',
  },
];

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/martuuust', icon: siGithub },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marta-g%C3%B3mez-41a4a72a9/',
    icon: siLinkedin,
  },
];
