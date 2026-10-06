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
  siVirtualbox,
} from 'simple-icons';

const siLinkedin: Skill['icon'] = {
  title: 'LinkedIn',
  slug: 'linkedin',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
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
  title: 'Stitch AI',
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
  /**
   * Sobre mí alineado al About de LinkedIn, sin nombrar empresas
   * (eso va solo en Experiencia).
   */
  bio: [
    'Soy desarrolladora web con experiencia previa en el ámbito tecnológico. Me gusta crear soluciones digitales funcionales, resolver problemas y aportar valor real a quien las usa.',
    'En el día a día trabajo con Angular, PHP, Express y SQL: desarrollo y consumo de APIs, integración con ERP y evolución hacia una arquitectura más mantenible.',
    'Formada en DAW y SMR, integro herramientas de IA (Antigravity, Cursor, Claude) junto con Figma y Stitch AI para potenciar el diseño, prototipado y desarrollo de software. Busco seguir aprendiendo y afrontar nuevos retos profesionales.',
  ],
  linkedin: 'https://www.linkedin.com/in/marta-g%C3%B3mez-41a4a72a9/',
};

export const NAV_LINKS: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'arquitectura', label: 'Arquitectura' },
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
      'Formación profesional de grado superior en desarrollo de aplicaciones web: diseño de interfaces y prototipado con Figma y Stitch AI, desarrollo frontend moderno con Angular, además de programación, bases de datos y entornos de desarrollo. Integración de IA aplicada (Antigravity, Cursor, Claude) para agilizar flujos de trabajo.',
    type: 'education',
    tags: [
      'Angular',
      'Figma',
      'Stitch AI',
      'Antigravity',
      'Cursor',
      'Claude',
      'Java',
      'JavaScript',
      'PHP',
      'SQL',
      'HTML/CSS',
    ],
  },
  {
    period: '2022 — 2024',
    title: 'Técnico en Sistemas Microinformáticos y Redes (SMR)',
    company: 'CIPFP Cheste',
    description:
      'Formación profesional de grado medio en sistemas microinformáticos y redes: montaje de equipos, sistemas operativos, redes y seguridad.',
    type: 'education',
    tags: ['Redes', 'Sistemas operativos', 'Hardware', 'Seguridad'],
  },
];

/**
 * Stack técnico organizado por categorías funcionales:
 * ai (Inteligencia Artificial), languages (Lenguajes), frameworks, database, tools.
 */
export const SKILLS: Skill[] = [
  // Inteligencia Artificial
  { name: 'Cursor', category: 'ai', icon: siCursor },
  { name: 'Claude', category: 'ai', icon: siClaude },
  { name: 'Stitch AI', category: 'ai', icon: siStitch },
  { name: 'Antigravity', category: 'ai', icon: siAntigravity },
  { name: 'OpenAI', category: 'ai', icon: siOpenai },
  { name: 'Gemini', category: 'ai', icon: siGooglegemini },
  { name: 'Google AI Studio', category: 'ai', icon: siGoogle },

  // Lenguajes
  { name: 'JavaScript', category: 'languages', icon: siJavascript },
  { name: 'PHP', category: 'languages', icon: siPhp },
  { name: 'Java', category: 'languages', icon: siOpenjdk },
  { name: 'HTML5', category: 'languages', icon: siHtml5 },
  { name: 'CSS3', category: 'languages', icon: siCss },

  // Frameworks y Librerías
  { name: 'Angular', category: 'frameworks', icon: siAngular },
  { name: 'Express', category: 'frameworks', icon: siExpress },
  { name: 'Bootstrap', category: 'frameworks', icon: siBootstrap },

  // Bases de Datos y ERP
  { name: 'MySQL', category: 'database', icon: siMysql },
  { name: 'MongoDB', category: 'database', icon: siMongodb },
  { name: 'Dolibarr', category: 'database', icon: siDolibarr },

  // Herramientas y DevOps
  { name: 'Git', category: 'tools', icon: siGit },
  { name: 'GitLab', category: 'tools', icon: siGitlab },
  { name: 'Docker', category: 'tools', icon: siDocker },
  { name: 'Figma', category: 'tools', icon: siFigma },
  { name: 'VirtualBox', category: 'tools', icon: siVirtualbox },
];

/**
 * Stats: sin cifras de relleno.
 * TODO(Marta): confirma si quieres mostrar repos públicos u otros métricas reales.
 */
export const STATS: Stat[] = [];

/**
 * Casos de estudio. Onna: arquitectura pública (LinkedIn), sin datos confidenciales.
 * CineMatch / Intermodular: solo hechos de GitHub hasta que Marta complete el caso.
 */
export const PROJECTS: Project[] = [
  {
    id: 'onna-distribuidores',
    title: 'Portal de distribuidores',
    tagline: 'Caso laboral · Onna Digital',
    problem:
      'Hacía falta una aplicación de acceso para distribuidores, con la información gestionada en un ERP y una base técnica por capas (DAL y Domain) que complicaba la evolución del producto.',
    whatIDid:
      'Participo en el desarrollo full-stack: frontend con Angular 21, servicios en PHP y Express, SQL, y Dolibarr como ERP. Trabajo en GitLab con ramas y buenas prácticas. Contribuyo a la migración hacia arquitectura hexagonal para separar mejor dominio, infraestructura y presentación.',
    result:
      'Una base más organizada y mantenible: comunicación clara entre servicios vía endpoints y una arquitectura preparada para escalar sin acoplar de más las capas.',
    stack: ['Angular 21', 'PHP', 'Express', 'SQL', 'Dolibarr', 'GitLab'],
    gradient: 'from-violet-700 via-purple-600 to-indigo-500',
    glyph: 'OD',
    year: '2026',
    complete: true,
  },
  {
    id: 'cinematch',
    title: 'CineMatch',
    tagline: 'Proyecto personal · TypeScript',
    // TODO(Marta): problema que resuelve, qué hiciste, resultado y captura
    problem: '',
    whatIDid: '',
    result: '',
    stack: ['TypeScript'],
    gradient: 'from-violet-600 via-purple-500 to-cyan-400',
    glyph: 'CM',
    github: 'https://github.com/martuuust/cineMatch',
    demo: 'https://cine-match-psi.vercel.app',
    year: '2026',
    complete: false,
  },
  {
    id: 'proyecto-intermodular',
    title: 'Proyecto Intermodular',
    tagline: 'Proyecto académico · TypeScript',
    // TODO(Marta): problema que resuelve, qué hiciste, resultado y captura
    problem: '',
    whatIDid: '',
    result: '',
    stack: ['TypeScript'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
    glyph: 'PI',
    github: 'https://github.com/martuuust/ProyectoIntermodular',
    year: '2025',
    complete: false,
  },
  {
    id: 'martagomez',
    title: 'Portfolio personal',
    tagline: 'Este sitio · Angular 21',
    problem:
      'Necesitaba un portfolio propio, honesto y mantenible, sin datos inventados y con una base técnica actual (Angular zoneless, Tailwind, GSAP).',
    whatIDid:
      'Diseñé e implementé la SPA: secciones, tema claro/oscuro, formularios con Web3Forms, casos de estudio y datos centralizados en TypeScript.',
    result:
      'Un sitio desplegable que presenta experiencia, stack y proyectos reales, con accesibilidad básica y animaciones respetuosas con reduced-motion.',
    stack: ['Angular 21', 'Tailwind CSS', 'GSAP', 'Web3Forms'],
    gradient: 'from-fuchsia-600 via-purple-500 to-violet-400',
    glyph: 'MG',
    github: 'https://github.com/martuuust/martaGomez',
    year: '2026',
    complete: true,
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
