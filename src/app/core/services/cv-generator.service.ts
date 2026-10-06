import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { EDUCATION, EXPERIENCE, PERSON, PROJECTS, SKILLS, SOCIALS } from '../../shared/data/portfolio.data';

export type CvTemplate = 'executive' | 'technical' | 'creative';

export interface CvTemplateInfo {
  id: CvTemplate;
  name: string;
  tagline: string;
  accent: string;
}

export const CV_TEMPLATES: CvTemplateInfo[] = [
  {
    id: 'executive',
    name: 'Ejecutivo',
    tagline: 'Limpio · 1 columna',
    accent: '#6d28d9',
  },
  {
    id: 'technical',
    name: 'Técnico',
    tagline: 'Skills al principio',
    accent: '#0891b2',
  },
  {
    id: 'creative',
    name: 'Creativo',
    tagline: '2 columnas con acento',
    accent: '#db2777',
  },
];

const MARGIN_L = 15;
const MARGIN_R = 15;
const MARGIN_T = 18;
const CONTENT_W = 210 - MARGIN_L - MARGIN_R;

interface DocContext {
  doc: jsPDF;
  y: number;
  page: number;
}

@Injectable({ providedIn: 'root' })
export class CvGeneratorService {
  async download(template: CvTemplate = 'executive'): Promise<void> {
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    doc.setLanguage('es');
    doc.setDocumentProperties({
      title: `CV - ${PERSON.name}`,
      subject: `${PERSON.role} · CV`,
      author: PERSON.name,
      creator: 'Marta Gómez Portfolio',
    });
    const ctx: DocContext = { doc, y: MARGIN_T, page: 1 };

    switch (template) {
      case 'technical':
        this.buildTechnical(ctx);
        break;
      case 'creative':
        this.buildCreative(ctx);
        break;
      default:
        this.buildExecutive(ctx);
    }

    const filename = `CV_${PERSON.lastName || 'Gomez'}_${PERSON.firstName || 'Marta'}_${template}.pdf`;
    doc.save(filename);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TEMPLATE 1 — Executive (una columna, limpia)
  // ─────────────────────────────────────────────────────────────────────────
  private buildExecutive(ctx: DocContext): void {
    const { doc } = ctx;

    // Header
    this.drawHeaderBlock(ctx, { accent: '#6d28d9', subtitleRight: true });

    // Perfil profesional
    this.drawHeading(ctx, 'Perfil profesional', '#6d28d9');
    for (const p of PERSON.bio) {
      this.drawTextWrapped(ctx, p, 10.5, '#1e293b', 0, 4.6);
    }
    ctx.y += 3;

    // Experiencia
    this.drawHeading(ctx, 'Experiencia profesional', '#6d28d9');
    for (const e of EXPERIENCE) {
      this.ensureSpace(ctx, 36);
      this.drawText(ctx, e.title, 12, '#0f172a', 'bold');
      this.drawInlinePair(ctx, e.company, e.period, '#6d28d9', '#475569');
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', 0, 4);
      ctx.y += 3.2;
    }

    // Proyectos
    this.drawHeading(ctx, 'Proyectos destacados', '#6d28d9');
    for (const p of PROJECTS.filter((p) => p.title && (p.whatIDid || p.problem || p.tagline))) {
      this.ensureSpace(ctx, 26);
      this.drawText(ctx, p.title, 11, '#0f172a', 'bold');
      this.drawTagsLine(ctx, p.stack, '#6d28d9');
      const text = p.whatIDid || p.problem || p.tagline || '';
      if (text) this.drawTextWrapped(ctx, text, 9.5, '#334155', 0, 4);
      ctx.y += 2.5;
    }

    // Educación
    this.drawHeading(ctx, 'Formación académica', '#6d28d9');
    for (const e of EDUCATION) {
      this.ensureSpace(ctx, 24);
      this.drawText(ctx, e.title, 11.5, '#0f172a', 'bold');
      this.drawInlinePair(ctx, e.company, e.period, '#6d28d9', '#475569');
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', 0, 4);
      ctx.y += 3;
    }

    // Habilidades
    this.drawHeading(ctx, 'Habilidades técnicas', '#6d28d9');
    this.drawSkillCloud(ctx, 0.9, '#6d28d9');

    // Pie
    this.drawFooter(ctx, '#6d28d9');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TEMPLATE 2 — Technical (skills arriba, muy denso)
  // ─────────────────────────────────────────────────────────────────────────
  private buildTechnical(ctx: DocContext): void {
    const { doc } = ctx;
    const accent = '#0891b2';

    // Barra técnica de cabecera
    doc.setFillColor(accent);
    doc.rect(0, 0, 210, 32, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(PERSON.name.toUpperCase(), MARGIN_L, 15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(PERSON.role + '  ·  ' + PERSON.location, MARGIN_L, 22);
    const metaLine = SOCIALS.map((s) => s.label).join('  ·  ');
    doc.setFontSize(9);
    doc.text(metaLine, MARGIN_L, 28);

    ctx.y = 42;

    // MATRIZ SKILLS (organizado por áreas técnicas)
    this.drawHeading(ctx, 'Stack técnico por áreas', accent);
    const categoryLabels: Record<string, string> = {
      ai: 'Inteligencia Artificial',
      languages: 'Lenguajes',
      frameworks: 'Frameworks y Librerías',
      database: 'Bases de Datos y ERP',
      tools: 'Herramientas y DevOps',
    };
    const groups = new Map<string, string[]>();
    for (const s of SKILLS) {
      const label = categoryLabels[s.category] ?? s.category;
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label)!.push(s.name);
    }
    let colY = ctx.y;
    const colW = (CONTENT_W - 10) / 2;
    let col = 0;
    for (const [group, names] of groups.entries()) {
      this.ensureSpace(ctx, 14);
      const x = MARGIN_L + col * (colW + 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(this.hexToRgb(accent).r, this.hexToRgb(accent).g, this.hexToRgb(accent).b);
      doc.text(group.toUpperCase(), x, ctx.y);
      ctx.y += 2;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const { r, g, b } = this.hexToRgb('#334155');
      doc.setTextColor(r, g, b);
      const wrapped = doc.splitTextToSize(names.join(' · '), colW);
      doc.text(wrapped, x, ctx.y);
      ctx.y += wrapped.length * 4.2 + 2.6;
      if (ctx.y - colY > 18) {
        col = (col + 1) % 2;
        if (col === 0) ctx.y += 1;
        if (col === 1) ctx.y = colY;
      }
    }
    ctx.y += 4;

    // EXPERIENCIA compacta
    this.drawHeading(ctx, 'Experiencia', accent);
    for (const e of EXPERIENCE) {
      this.ensureSpace(ctx, 30);
      this.drawText(ctx, `${e.title} — ${e.company}`, 11.5, '#0f172a', 'bold');
      this.drawText(ctx, e.period, 9.5, accent, 'normal', 0, 2);
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', 0, 4);
      if (e.tags?.length) {
        this.drawText(ctx, 'Stack: ' + e.tags.join(' · '), 8.5, '#475569', 'italic');
        ctx.y += 0.5;
      }
      ctx.y += 3;
    }

    // Proyectos
    this.drawHeading(ctx, 'Proyectos', accent);
    for (const p of PROJECTS.slice(0, 4)) {
      this.ensureSpace(ctx, 20);
      const hasLink = !!(p.demo || p.github);
      this.drawText(ctx, p.title + (hasLink ? '  ↗' : ''), 11, '#0f172a', 'bold');
      this.drawTagsLine(ctx, p.stack, accent);
      const text = p.whatIDid || p.problem || p.tagline;
      if (text) this.drawTextWrapped(ctx, text, 9.5, '#334155', 0, 4);
      ctx.y += 2.2;
    }

    // Educación
    this.drawHeading(ctx, 'Educación y certificaciones', accent);
    for (const e of EDUCATION) {
      this.ensureSpace(ctx, 22);
      this.drawText(ctx, e.title, 11, '#0f172a', 'bold');
      this.drawInlinePair(ctx, e.company, e.period, accent, '#475569');
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', 0, 4);
      ctx.y += 2;
    }

    this.drawFooter(ctx, accent);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TEMPLATE 3 — Creative (sidebar de 2 colores + contenido)
  // ─────────────────────────────────────────────────────────────────────────
  private buildCreative(ctx: DocContext): void {
    const { doc } = ctx;
    const accent = '#db2777';

    // Barra lateral
    doc.setFillColor('#111827');
    doc.rect(0, 0, 62, 297, 'F');
    doc.setFillColor(accent);
    doc.rect(0, 0, 62, 46, 'F');

    // Nombre en sidebar
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(PERSON.name.split(' ')[0], 8, 16);
    doc.text(PERSON.name.split(' ').slice(1).join(' ') || '', 8, 24);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 224, 238);
    doc.text(PERSON.role, 8, 33);
    doc.text(PERSON.location, 8, 39);

    // Contacto en sidebar
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(244, 114, 182);
    doc.text('CONTACTO', 8, 62);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240);
    let cy = 68;
    for (const s of SOCIALS) {
      const lines = doc.splitTextToSize(`${s.label}: ${s.href}`, 48);
      doc.text(lines, 8, cy);
      cy += lines.length * 3.8 + 1.2;
    }

    // Sidebar skills
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(244, 114, 182);
    doc.text('SKILLS', 8, cy + 5);
    cy += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(226, 232, 240);
    const flat = SKILLS.map((s) => s.name);
    for (const name of flat) {
      doc.text('◆  ' + name, 8, cy);
      cy += 3.6;
    }

    // Sidebar bio mini
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(244, 114, 182);
    doc.text('SOBRE MÍ', 8, Math.min(cy + 5, 260));
    const bioY = Math.min(cy + 11, 265);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    const bio = PERSON.bio[0] ?? '';
    const bioLines = doc.splitTextToSize(bio, 48);
    doc.text(bioLines.slice(0, 8), 8, bioY);

    // Contenido principal (empieza después del margen)
    const MAIN_X = 72;
    const MAIN_W = 210 - MAIN_X - MARGIN_R;
    const savedMarginL = MARGIN_L;
    // Usaremos helpers sobreescribiendo el texto x manualmente
    ctx.y = 18;

    this.drawCreativeHeading(ctx, MAIN_X, MAIN_W, 'EXPERIENCIA', accent);
    for (const e of EXPERIENCE) {
      this.ensureSpace(ctx, 32);
      this.drawCreativeRow(ctx, MAIN_X, e.title, e.period, accent, 12);
      this.drawTextAt(ctx, MAIN_X, e.company, 10, accent, 'normal');
      ctx.y += 1.2;
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', MAIN_X - savedMarginL, 4, MAIN_W);
      ctx.y += 3;
    }

    this.drawCreativeHeading(ctx, MAIN_X, MAIN_W, 'PROYECTOS', accent);
    for (const p of PROJECTS.slice(0, 4)) {
      this.ensureSpace(ctx, 22);
      this.drawTextAt(ctx, MAIN_X, p.title, 11, '#0f172a', 'bold');
      this.drawTagsLine(ctx, p.stack, accent, MAIN_X - savedMarginL);
      const text = p.whatIDid || p.problem || p.tagline;
      if (text) this.drawTextWrapped(ctx, text, 9.5, '#334155', MAIN_X - savedMarginL, 4, MAIN_W);
      ctx.y += 2;
    }

    this.drawCreativeHeading(ctx, MAIN_X, MAIN_W, 'FORMACIÓN', accent);
    for (const e of EDUCATION) {
      this.ensureSpace(ctx, 24);
      this.drawCreativeRow(ctx, MAIN_X, e.title, e.period, accent, 11);
      this.drawTextAt(ctx, MAIN_X, e.company, 10, accent, 'normal');
      ctx.y += 1.2;
      this.drawTextWrapped(ctx, e.description, 9.5, '#334155', MAIN_X - savedMarginL, 4, MAIN_W);
      ctx.y += 2;
    }

    this.drawFooter(ctx, accent, MAIN_X - savedMarginL);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────────
  private drawHeaderBlock(
    ctx: DocContext,
    opts: { accent: string; subtitleRight?: boolean },
  ): void {
    const { doc } = ctx;

    // Barra acento
    doc.setFillColor(this.hexToRgb(opts.accent).r, this.hexToRgb(opts.accent).g, this.hexToRgb(opts.accent).b);
    doc.rect(0, 0, 210, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text(PERSON.name, MARGIN_L, ctx.y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const sub = this.hexToRgb(opts.accent);
    doc.setTextColor(sub.r, sub.g, sub.b);
    if (opts.subtitleRight) {
      doc.text(PERSON.role, MARGIN_L, ctx.y + 14);
      // Meta (location + contact links) alineado a la derecha
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      const lines = [
        PERSON.location,
        ...SOCIALS.map((s) => `${s.label}: ${s.href}`),
      ];
      for (let i = 0; i < lines.length; i++) {
        doc.text(lines[i], MARGIN_L + CONTENT_W, ctx.y + 6 + i * 4.2, { align: 'right' });
      }
    } else {
      doc.text(PERSON.role, MARGIN_L, ctx.y + 14);
    }

    ctx.y += 22;
    doc.setDrawColor(this.hexToRgb(opts.accent).r, this.hexToRgb(opts.accent).g, this.hexToRgb(opts.accent).b);
    doc.setLineWidth(0.4);
    doc.line(MARGIN_L, ctx.y, 210 - MARGIN_R, ctx.y);
    ctx.y += 6;
  }

  private drawHeading(ctx: DocContext, title: string, accent: string): void {
    this.ensureSpace(ctx, 12);
    const { doc } = ctx;
    const c = this.hexToRgb(accent);
    doc.setFillColor(c.r, c.g, c.b);
    doc.rect(MARGIN_L, ctx.y - 0.6, 2.2, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), MARGIN_L + 5, ctx.y + 3.4);
    ctx.y += 7;
  }

  private drawCreativeHeading(
    ctx: DocContext,
    x: number,
    width: number,
    title: string,
    accent: string,
  ): void {
    this.ensureSpace(ctx, 10);
    const { doc } = ctx;
    const c = this.hexToRgb(accent);
    doc.setDrawColor(c.r, c.g, c.b);
    doc.setLineWidth(0.7);
    doc.line(x, ctx.y, x + width, ctx.y);
    doc.setFillColor(c.r, c.g, c.b);
    doc.rect(x, ctx.y - 1, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(title, x + 6, ctx.y + 1);
    ctx.y += 7;
  }

  private drawCreativeRow(
    ctx: DocContext,
    x: number,
    title: string,
    right: string,
    accent: string,
    size: number,
  ): void {
    const { doc } = ctx;
    const maxLeft = 195 - x - doc.getTextDimensions(right).w - 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(size);
    doc.setTextColor(15, 23, 42);
    const leftTrunc = this.truncateToWidth(doc, title, maxLeft);
    doc.text(leftTrunc, x, ctx.y + 1);
    const c = this.hexToRgb(accent);
    doc.setTextColor(c.r, c.g, c.b);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(right, 195, ctx.y + 1, { align: 'right' });
    ctx.y += 4.2;
  }

  private truncateToWidth(doc: jsPDF, text: string, maxW: number): string {
    if (doc.getTextDimensions(text).w <= maxW) return text;
    let t = text;
    while (t && doc.getTextDimensions(t + '…').w > maxW) t = t.slice(0, -1);
    return t + '…';
  }

  private drawText(
    ctx: DocContext,
    text: string,
    size: number,
    hex: string,
    style: 'normal' | 'bold' | 'italic' = 'normal',
    dx = 0,
    lineAfter = 4,
  ): void {
    const { doc } = ctx;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    const c = this.hexToRgb(hex);
    doc.setTextColor(c.r, c.g, c.b);
    doc.text(text, MARGIN_L + dx, ctx.y);
    ctx.y += lineAfter;
  }

  private drawTextAt(
    ctx: DocContext,
    x: number,
    text: string,
    size: number,
    hex: string,
    style: 'normal' | 'bold' | 'italic' = 'normal',
    lineAfter = 4,
  ): void {
    const { doc } = ctx;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    const c = this.hexToRgb(hex);
    doc.setTextColor(c.r, c.g, c.b);
    doc.text(text, x, ctx.y);
    ctx.y += lineAfter;
  }

  private drawInlinePair(ctx: DocContext, left: string, right: string, accent: string, dim: string): void {
    const { doc } = ctx;
    const ca = this.hexToRgb(accent);
    const cb = this.hexToRgb(dim);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(ca.r, ca.g, ca.b);
    doc.text(left, MARGIN_L, ctx.y);
    doc.setTextColor(cb.r, cb.g, cb.b);
    doc.text(right, 210 - MARGIN_R, ctx.y, { align: 'right' });
    ctx.y += 4;
  }

  private drawTextWrapped(
    ctx: DocContext,
    text: string,
    size: number,
    hex: string,
    dx: number,
    lineGap: number,
    widthOverride?: number,
  ): void {
    const { doc } = ctx;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    const c = this.hexToRgb(hex);
    doc.setTextColor(c.r, c.g, c.b);
    const w = widthOverride ?? (CONTENT_W - dx);
    const lines = doc.splitTextToSize(text, w);
    doc.text(lines, MARGIN_L + dx, ctx.y);
    ctx.y += lines.length * lineGap;
  }

  private drawBullet(ctx: DocContext, text: string, hex: string, dx = 0, widthOverride?: number): void {
    const { doc } = ctx;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const c = this.hexToRgb(hex);
    doc.setTextColor(c.r, c.g, c.b);
    const w = widthOverride ?? (CONTENT_W - dx - 3);
    const lines = doc.splitTextToSize(text, w);
    // bullet marker
    doc.setFillColor(c.r, c.g, c.b);
    doc.circle(MARGIN_L + dx + 0.8, ctx.y - 1.1, 0.45, 'F');
    doc.text(lines, MARGIN_L + dx + 3, ctx.y);
    ctx.y += lines.length * 3.6;
  }

  private drawTagsLine(ctx: DocContext, tags: string[], accent: string, dx = 0): void {
    if (!tags?.length) {
      ctx.y += 1.5;
      return;
    }
    const { doc } = ctx;
    const c = this.hexToRgb(accent);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(c.r, c.g, c.b);
    const line = tags.join('  ·  ');
    doc.text(line, MARGIN_L + dx, ctx.y);
    ctx.y += 3.8;
  }

  private drawSkillCloud(ctx: DocContext, scale: number, accent: string): void {
    const { doc } = ctx;
    const flat = SKILLS.map((s) => ({
      name: s.name,
      usage:
        0.35 +
        (s.category === 'languages' || s.category === 'frameworks' || s.name === 'Cursor' || s.name === 'Claude'
          ? 0.65
          : 0.35) *
          scale,
    }));
    let x = MARGIN_L;
    const c = this.hexToRgb(accent);
    for (const s of flat) {
      this.ensureSpace(ctx, 8);
      const size = 8 + s.usage * 4;
      doc.setFont('helvetica', size >= 10.5 ? 'bold' : 'normal');
      doc.setFontSize(size);
      const textW = doc.getTextDimensions(' ' + s.name + ' ').w + 4;
      if (x + textW > 210 - MARGIN_R) {
        x = MARGIN_L;
        ctx.y += 7;
        this.ensureSpace(ctx, 8);
      }
      // pill
      doc.setDrawColor(c.r, c.g, c.b);
      doc.setFillColor(250, 245, 255);
      doc.roundedRect(x, ctx.y - 3, textW, 5.6, 1.4, 1.4, 'FD');
      doc.setTextColor(c.r, c.g, c.b);
      doc.text(s.name, x + 2, ctx.y + 0.9);
      x += textW + 2.2;
    }
    ctx.y += 6;
  }

  private drawFooter(ctx: DocContext, accent: string, dx = 0): void {
    const { doc } = ctx;
    const c = this.hexToRgb(accent);
    doc.setDrawColor(c.r, c.g, c.b);
    doc.setLineWidth(0.3);
    const fy = Math.max(ctx.y, 270);
    doc.line(MARGIN_L + dx, fy, 210 - MARGIN_R, fy);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const socials = SOCIALS.map((s) => `${s.label}: ${s.href}`).join('   ·   ');
    doc.text(socials, MARGIN_L + dx, fy + 5);
    doc.text(
      `Generado desde martagomez.dev — ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}`,
      210 - MARGIN_R,
      fy + 5,
      { align: 'right' },
    );
  }

  private ensureSpace(ctx: DocContext, mm: number): void {
    if (ctx.y + mm > 282) {
      ctx.doc.addPage();
      ctx.y = MARGIN_T;
      ctx.page += 1;
    }
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '');
    const n = parseInt(clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
}
