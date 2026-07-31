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
  siCypress,
  siDocker,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siGmail,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedux,
  siSass,
  siStorybook,
  siTailwindcss,
  siTypescript,
  siVite,
  siX,
} from 'simple-icons';

const siLinkedin: Skill['icon'] = {
  title: 'LinkedIn',
  slug: 'linkedin',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
};

export const PERSON = {
  name: 'Marta Gómez',
  firstName: 'Marta',
  lastName: 'Gómez',
  role: 'Frontend Developer & UI/UX Designer',
  email: 'hola@martagomez.dev',
  location: 'Madrid, España',
  available: true,
  bio: 'Diseño y construyo experiencias digitales que combinan rendimiento extremo con estética cuidada. Especialista en Angular y en convertir interfaces complejas en momentos memorables.',
};

export const NAV_LINKS: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export const HERO_ROLES = [
  'Interfaces que enamoran.',
  'Código limpio y escalable.',
  'Microinteracciones memorables.',
  'UX con intención.',
];

export const STATS: Stat[] = [
  { label: 'Años de experiencia', value: 6, suffix: '+' },
  { label: 'Proyectos completados', value: 48, suffix: '' },
  { label: 'Tecnologías dominadas', value: 20, suffix: '+' },
  { label: 'Clientes satisfechos', value: 27, suffix: '' },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: '2023 — Actualidad',
    title: 'Frontend Lead',
    company: 'Nova Digital Studio',
    description:
      'Lidero un equipo de 5 personas construyendo productos SaaS con Angular y NX. Definí el design system y elevé el rendimiento LCP un 42%.',
    type: 'work',
    tags: ['Angular', 'NX', 'Signals', 'Design System'],
  },
  {
    period: '2021 — 2023',
    title: 'Frontend Developer',
    company: 'Kiwitek',
    description:
      'Desarrollé dashboards analíticos en tiempo real y migré la plataforma a un stack zoneless y orientado a signals.',
    type: 'work',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
  },
  {
    period: '2020 — 2021',
    title: 'UI/UX Designer & Developer',
    company: 'Freelance',
    description:
      'Diseñé y desarrollé webs corporativas y tiendas online end-to-end para pymes y startups en fase temprana.',
    type: 'work',
    tags: ['Figma', 'HTML/CSS', 'Tailwind', 'SEO'],
  },
  {
    period: '2018 — 2020',
    title: 'Bootcamp Full-Stack',
    company: '42 Madrid',
    description:
      'Formación intensiva en desarrollo de software: arquitectura web, bases de datos y metodologías ágiles.',
    type: 'education',
    tags: ['JavaScript', 'Python', 'SQL', 'Agile'],
  },
];

export const SKILLS: Skill[] = [
  { name: 'Angular', category: 'frontend', level: 95, icon: siAngular },
  { name: 'TypeScript', category: 'frontend', level: 92, icon: siTypescript },
  { name: 'JavaScript', category: 'frontend', level: 90, icon: siJavascript },
  { name: 'HTML5', category: 'frontend', level: 96, icon: siHtml5 },
  { name: 'CSS3 / Sass', category: 'frontend', level: 93, icon: siSass },
  { name: 'Tailwind CSS', category: 'frontend', level: 94, icon: siTailwindcss },
  { name: 'React', category: 'frontend', level: 82, icon: siReact },
  { name: 'Next.js', category: 'frontend', level: 78, icon: siNextdotjs },
  { name: 'Redux', category: 'frontend', level: 80, icon: siRedux },
  { name: 'Vite', category: 'frontend', level: 85, icon: siVite },
  { name: 'Node.js', category: 'backend', level: 80, icon: siNodedotjs },
  { name: 'NestJS', category: 'backend', level: 74, icon: siNestjs },
  { name: 'Prisma', category: 'backend', level: 72, icon: siPrisma },
  { name: 'MongoDB', category: 'backend', level: 76, icon: siMongodb },
  { name: 'PostgreSQL', category: 'backend', level: 78, icon: siPostgresql },
  { name: 'Firebase', category: 'backend', level: 81, icon: siFirebase },
  { name: 'Docker', category: 'tools', level: 75, icon: siDocker },
  { name: 'Git', category: 'tools', level: 90, icon: siGit },
  { name: 'Jest', category: 'tools', level: 84, icon: siJest },
  { name: 'Cypress', category: 'tools', level: 79, icon: siCypress },
  { name: 'Storybook', category: 'tools', level: 82, icon: siStorybook },
  { name: 'Figma', category: 'tools', level: 88, icon: siFigma },
];

export const PROJECTS: Project[] = [
  {
    id: 'pulse',
    title: 'Pulse Analytics',
    category: 'web',
    tagline: 'Dashboard de analítica en tiempo real',
    description:
      'Plataforma SaaS para visualizar métricas de producto en tiempo real con streaming de datos y charts animados.',
    highlights: [
      'Streaming de datos en tiempo real con WebSockets',
      'Más de 20 visualizaciones animadas y personalizables',
      'Modo oscuro completo y accesible (WCAG AA)',
      'Rendimiento 60fps con virtualización de datos',
    ],
    tags: ['Angular', 'TypeScript', 'D3.js', 'Tailwind', 'WebSockets'],
    icon: siAngular,
    gradient: 'from-violet-600 via-purple-500 to-cyan-400',
    glyph: 'PA',
    github: 'https://github.com/martagomez/pulse-analytics',
    demo: 'https://pulse-demo.martagomez.dev',
    year: '2025',
  },
  {
    id: 'aurora',
    title: 'Aurora UI Kit',
    category: 'uiux',
    tagline: 'Design system con 90+ componentes',
    description:
      'Librería de componentes accesibles con tokens de diseño, theming dinámico y documentación viva con Storybook.',
    highlights: [
      '90+ componentes con soporte completo de temas',
      'Tokens de diseño generados desde Figma via Style Dictionary',
      'A11y por defecto: foco, ARIA y navegación por teclado',
      'Publicado como paquete npm con tree-shaking',
    ],
    tags: ['Angular', 'Tailwind', 'Storybook', 'Figma', 'Tokens'],
    icon: siStorybook,
    gradient: 'from-pink-500 via-fuchsia-500 to-violet-500',
    glyph: 'AU',
    github: 'https://github.com/martagomez/aurora-ui',
    demo: 'https://aurora-ui.martagomez.dev',
    year: '2025',
  },
  {
    id: 'flow',
    title: 'Flow Tasks',
    category: 'mobile',
    tagline: 'App de productividad offline-first',
    description:
      'Aplicación móvil híbrida para gestión de tareas con sincronización offline y notificaciones inteligentes.',
    highlights: [
      'Arquitectura offline-first con sincronización conflict-free',
      'Notifications push con recordatorios predictivos',
      'Interfaz adaptable a una mano con gestos nativos',
      'Score de rendimiento Lighthouse 98/100',
    ],
    tags: ['Angular', 'Capacitor', 'PWA', 'IndexedDB', 'Ionic'],
    icon: siReact,
    gradient: 'from-cyan-500 via-teal-500 to-emerald-400',
    glyph: 'FT',
    github: 'https://github.com/martagomez/flow-tasks',
    demo: 'https://flow-tasks.martagomez.dev',
    year: '2024',
  },
  {
    id: 'nube',
    title: 'Nube CMS',
    category: 'web',
    tagline: 'Editor visual headless para equipos',
    description:
      'CMS headless con editor de bloques visual, preview en vivo y generación estática distribuida por edge.',
    highlights: [
      'Editor de bloques drag-and-drop con preview en vivo',
      'Builds estáticos distribuidos en el edge (sub-50ms TTFB)',
      'API GraphQL tipada y auto-generada',
      'Sistema de roles y control de versiones',
    ],
    tags: ['Next.js', 'GraphQL', 'TypeScript', 'Prisma', 'Vercel'],
    icon: siNextdotjs,
    gradient: 'from-slate-700 via-slate-600 to-slate-400',
    glyph: 'NC',
    github: 'https://github.com/martagomez/nube-cms',
    demo: 'https://nube-cms.martagomez.dev',
    year: '2024',
  },
  {
    id: 'lumen',
    title: 'Lumen AI Copilot',
    category: 'ia',
    tagline: 'Asistente de código para equipos',
    description:
      'Extensión y web app que asiste a equipos de desarrollo con refactors guiados y detección de deuda técnica.',
    highlights: [
      'Detección y visualización de deuda técnica en vivo',
      'Refactors guiados paso a paso con diff preview',
      'Fine-tuning sobre el estilo de código del equipo',
      'Integración con GitHub, GitLab y Bitbucket',
    ],
    tags: ['Angular', 'Python', 'OpenAI', 'FastAPI', 'WebSockets'],
    icon: siNodedotjs,
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    glyph: 'LA',
    github: 'https://github.com/martagomez/lumen-ai',
    demo: 'https://lumen-ai.martagomez.dev',
    year: '2023',
  },
  {
    id: 'bazar',
    title: 'Bazar Market',
    category: 'mobile',
    tagline: 'Marketplace social para creadores',
    description:
      'Marketplace PWA para artistas y creadores con checkout integrado y feeds sociales personalizados.',
    highlights: [
      'PWA instalable con modo offline y add-to-home',
      'Checkout con pagos y carrito persistente',
      'Recomendaciones basadas en comportamiento real',
      'Animaciones de marca fluidas con GSAP',
    ],
    tags: ['React', 'Tailwind', 'Stripe', 'GSAP', 'Firebase'],
    icon: siFirebase,
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    glyph: 'BM',
    github: 'https://github.com/martagomez/bazar-market',
    demo: 'https://bazar-market.martagomez.dev',
    year: '2023',
  },
];

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/martagomez', icon: siGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/martagomez', icon: siLinkedin },
  { label: 'X / Twitter', href: 'https://x.com/martagomez', icon: siX },
  { label: 'Email', href: 'mailto:hola@martagomez.dev', icon: siGmail },
];
