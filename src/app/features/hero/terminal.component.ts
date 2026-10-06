import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { gsap } from 'gsap';

export interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'success' | 'info';
  content: string;
  delay?: number;
}

export interface TerminalCommand {
  input: string;
  lines: TerminalLine[];
}

interface HistoryBlock {
  id: number;
  input: string;
  isTypingInput: boolean;
  lines: Array<{ key: string; type: TerminalLine['type']; content: string }>;
}

const COMMANDS: TerminalCommand[] = [
  {
    input: 'whoami',
    lines: [
      { type: 'success', content: 'Marta Gómez — Desarrolladora Web' },
      { type: 'info', content: '📍 Chiva, Valencia, España · 🟢 Disponible' },
    ],
  },
  {
    input: 'skills --daily',
    lines: [
      { type: 'output', content: '┌─────────────────────────────────────────────┐' },
      { type: 'output', content: '│ Angular 21  │  PHP  │  Express  │  MySQL    │' },
      { type: 'output', content: '│ Dolibarr    │  Git  │  GitLab   │  GSAP     │' },
      { type: 'output', content: '└─────────────────────────────────────────────┘' },
    ],
  },
  {
    input: 'architecture show --current',
    lines: [
      { type: 'output', content: '→ Clean Architecture & Ports/Adapters' },
      { type: 'success', content: '  ✓ Dominio puro sin dependencias de frameworks' },
      { type: 'success', content: '  ✓ Separación Dominio · Aplicación · Infraestructura' },
      { type: 'info', content: '  ℹ Explora el diagrama interactivo en la sección Arquitectura' },
    ],
  },
  {
    input: 'contact --open linkedin',
    lines: [
      { type: 'info', content: 'Abriendo LinkedIn… → /#contacto' },
      { type: 'success', content: 'Escríbeme — respondo en menos de 24h ✓' },
    ],
  },
  {
    input: 'help --short',
    lines: [
      { type: 'output', content: 'Comandos: whoami | skills | architecture | contact | help | clear' },
    ],
  },
];

const ALL_COMMAND_NAMES = COMMANDS.map((c) => c.input.split(' ')[0]).concat(['clear', 'cls']);

@Component({
  selector: 'app-terminal',
  standalone: true,
  template: `
    <div
      #terminalRef
      class="pointer-events-auto relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-[#0a0612]/95 text-sm shadow-2xl backdrop-blur-xl dark:bg-[#050208]/95"
      role="region"
      aria-label="Terminal interactiva de Marta Gómez"
    >
      <div
        class="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-indigo-900/40 px-4 py-2.5"
      >
        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full bg-red-500/80 shadow-inner"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500/80 shadow-inner"></span>
          <span class="h-3 w-3 rounded-full bg-emerald-500/80 shadow-inner"></span>
        </div>
        <span class="font-mono text-[11px] font-medium uppercase tracking-widest text-purple-200/70">
          marta@portfolio — zsh
        </span>
        <div class="flex items-center gap-2 text-[10px] font-mono text-purple-200/50">
          <kbd class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">Ctrl</kbd>
          <span>+</span>
          <kbd class="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">K</kbd>
          <span class="ml-1 hidden sm:inline">limpiar</span>
        </div>
      </div>

      <div
        #screenRef
        class="h-[280px] overflow-y-auto px-4 py-4 font-mono sm:h-[320px] cursor-text selection:bg-fuchsia-500/30 selection:text-fuchsia-100"
        aria-live="polite"
        (click)="focusInput()"
      >
        <div class="flex items-center gap-2 text-purple-300/60 text-xs">
          <span>──</span>
          <span>Sistema iniciado · portfolio shell v1.0 · zoneless Angular</span>
          <span class="flex-1">──────────────────────────────────</span>
        </div>

        @for (block of history(); track block.id) {
          <div class="mt-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-semibold text-emerald-400">marta</span>
              <span class="text-purple-400">@</span>
              <span class="font-semibold text-cyan-400">portfolio</span>
              <span class="text-purple-400">:</span>
              <span class="text-purple-200">~</span>
              <span class="text-fuchsia-400">$</span>
              <span class="text-fuchsia-100 whitespace-pre">{{ block.input }}</span>
              <span
                class="ml-1 inline-block h-4 w-2 animate-blink bg-fuchsia-300/90 sm:h-5"
                [class.hidden]="!block.isTypingInput"
                aria-hidden="true"
              ></span>
            </div>

            @if (!block.isTypingInput) {
              @for (line of block.lines; track line.key) {
                <div
                  class="whitespace-pre-wrap break-words pl-2 pt-1 leading-relaxed"
                  [class]="lineClass(line.type)"
                >
                  {{ line.content }}
                </div>
              }
            }
          </div>
        }

        <div class="mt-3 flex flex-wrap items-start gap-2">
          <span class="font-semibold text-emerald-400 whitespace-nowrap">marta</span>
          <span class="text-purple-400">@</span>
          <span class="font-semibold text-cyan-400 whitespace-nowrap">portfolio</span>
          <span class="text-purple-400">:</span>
          <span class="text-purple-200 whitespace-nowrap">~</span>
          <span class="text-fuchsia-400">$</span>
          <span class="relative flex-1 min-w-[120px]">
            <span class="text-fuchsia-100 whitespace-pre break-all">{{ promptBuffer() }}</span>
            <span
              #caretRef
              class="inline-block h-4 w-2 bg-fuchsia-300/90 sm:h-5 ml-[1px] align-middle"
              [class.animate-blink]="!inputFocused() || true"
              aria-hidden="true"
            ></span>
          </span>

          <textarea
            #hiddenInput
            rows="1"
            class="absolute h-0 w-0 opacity-0 pointer-events-none"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            (keydown)="onKeyDown($event)"
            (input)="onInput($event)"
            (focus)="inputFocused.set(true)"
            (blur)="inputFocused.set(false)"
            aria-hidden="true"
            tabindex="0"
          ></textarea>
        </div>
      </div>

      <div class="border-t border-white/10 bg-black/30 px-4 py-2">
        <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono text-purple-300/60">
          @for (cmd of quickCmds; track cmd) {
            <button
              type="button"
              (click)="runQuick(cmd)"
              class="group rounded-md border border-white/10 bg-white/5 px-2.5 py-1 transition-all hover:border-fuchsia-400/40 hover:bg-fuchsia-400/10 hover:text-fuchsia-200"
            >
              <span class="text-fuchsia-400/80 group-hover:text-fuchsia-300">›</span>
              {{ cmd }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-blink {
        animation: terminal-blink 1.05s step-end infinite;
      }

      @keyframes terminal-blink {
        0%, 50% { opacity: 1; }
        50.01%, 100% { opacity: 0; }
      }

      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.35); border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.6); }
    `,
  ],
})
export class TerminalComponent implements AfterViewInit {
  protected readonly quickCmds = [
    'whoami',
    'skills --daily',
    'architecture show --current',
    'contact --open linkedin',
  ];

  protected readonly history = signal<HistoryBlock[]>([]);
  protected readonly promptBuffer = signal<string>('');
  protected readonly inputFocused = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly terminalRef = viewChild<ElementRef<HTMLDivElement>>('terminalRef');
  private readonly screenRef = viewChild<ElementRef<HTMLDivElement>>('screenRef');
  private readonly caretRef = viewChild<ElementRef<HTMLSpanElement>>('caretRef');
  private readonly hiddenInput = viewChild<ElementRef<HTMLTextAreaElement>>('hiddenInput');

  private historyCounter = 0;
  private cancelled = false;
  private isBusy = false;

  private readonly commandHistory: string[] = [];
  private historyCursor = -1;
  private savedDraft = '';

  ngAfterViewInit(): void {
    this.destroyRef.onDestroy(() => (this.cancelled = true));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.playShowcase(reduced);
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(event: Event): void {
    const e = event as KeyboardEvent;
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      this.clear();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      this.clearSoft();
    }
  }

  protected onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLTextAreaElement | null;
    if (!input) return;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.submitCurrentPrompt();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateHistory(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateHistory(+1);
        break;
      case 'Tab':
        event.preventDefault();
        this.autocomplete();
        break;
      case 'c':
      case 'C':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.cancelCurrentLine();
        }
        break;
      case 'l':
      case 'L':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.clearSoft();
        }
        break;
    }
  }

  protected onInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement | null;
    if (!el) return;
    const value = el.value.replace(/\r?\n/g, '');
    this.promptBuffer.set(value);
    this.historyCursor = -1;
    requestAnimationFrame(() => this.scrollToBottom());
  }

  protected focusInput(): void {
    const input = this.hiddenInput()?.nativeElement;
    if (input) {
      input.focus();
      requestAnimationFrame(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
    }
  }

  protected clear(): void {
    this.cancelled = true;
    this.isBusy = false;
    this.commandHistory.length = 0;
    this.historyCursor = -1;
    this.promptBuffer.set('');
    const input = this.hiddenInput()?.nativeElement;
    if (input) input.value = '';
    setTimeout(() => {
      this.cancelled = false;
      this.history.set([]);
      this.playShowcase(false, 200);
    }, 80);
  }

  protected clearSoft(): void {
    const keepLast = this.history().slice(-1);
    this.history.set(keepLast);
    requestAnimationFrame(() => this.scrollToBottom());
  }

  protected runQuick(cmd: string): void {
    this.focusInput();
    if (this.isBusy) return;
    const match = COMMANDS.find((c) => cmd === c.input) ?? COMMANDS.find((c) => cmd.startsWith(c.input.split(' ')[0]));
    if (match) void this.runCommandAnimated(match, 16);
    else this.appendErrorForUnknown(cmd);
  }

  protected lineClass(type: TerminalLine['type']): string {
    switch (type) {
      case 'success': return 'text-emerald-300';
      case 'error':   return 'text-rose-300';
      case 'info':    return 'text-sky-300';
      case 'prompt':  return 'text-fuchsia-100';
      default:        return 'text-purple-100/90';
    }
  }

  private async playShowcase(reduced: boolean, waitMs = 450): Promise<void> {
    await this.wait(waitMs);
    if (this.cancelled) return;
    const cmd = COMMANDS[0];
    await this.runCommandAnimated(cmd, reduced ? 0 : 30, false);
    if (this.cancelled) return;
    await this.wait(reduced ? 0 : 350);
    if (this.cancelled) return;
    const hintId = ++this.historyCounter;
    this.history.update((h) => [
      ...h,
      {
        id: hintId,
        input: '',
        isTypingInput: false,
        lines: [
          {
            key: `hint-${hintId}`,
            type: 'info',
            content:
              '💡 Escribe o pulsa botones · ↑↓ historial · Tab autocompletar · Ctrl+K limpiar · Ctrl+C cancelar',
          },
        ],
      },
    ]);
    this.scrollToBottom();
    this.caretBump();
    this.focusInput();
  }

  private submitCurrentPrompt(): void {
    if (this.isBusy) return;
    const raw = this.promptBuffer().trim();
    const input = this.hiddenInput()?.nativeElement;
    this.promptBuffer.set('');
    if (input) {
      input.value = '';
    }
    if (!raw) {
      const id = ++this.historyCounter;
      this.history.update((h) => [...h, { id, input: '', isTypingInput: false, lines: [] }]);
      requestAnimationFrame(() => this.scrollToBottom());
      return;
    }
    this.commandHistory.push(raw);
    this.historyCursor = -1;
    this.savedDraft = '';

    if (raw === 'clear' || raw === 'cls') {
      this.clearSoft();
      return;
    }

    const cmdName = raw.split(' ')[0];
    const match = COMMANDS.find((c) => c.input === raw) ?? COMMANDS.find((c) => c.input.split(' ')[0] === cmdName);
    if (match) {
      void this.runCommandAnimated(match, 20, true);
    } else {
      this.appendErrorForUnknown(raw);
    }
  }

  private appendErrorForUnknown(raw: string): void {
    const id = ++this.historyCounter;
    this.history.update((h) => [
      ...h,
      {
        id,
        input: raw,
        isTypingInput: false,
        lines: [
          {
            key: `unk-${id}`,
            type: 'error',
            content: `zsh: command not found: ${raw}`,
          },
          {
            key: `unk-sug-${id}`,
            type: 'output',
            content: `  Prueba con: help --short`,
          },
        ],
      },
    ]);
    requestAnimationFrame(() => this.scrollToBottom());
  }

  private navigateHistory(delta: number): void {
    if (this.isBusy) return;
    if (this.commandHistory.length === 0) return;

    if (this.historyCursor === -1) {
      this.savedDraft = this.promptBuffer();
    }

    const nextCursor = this.historyCursor === -1
      ? (delta === -1 ? this.commandHistory.length - 1 : -1)
      : this.historyCursor + delta;

    if (nextCursor < -1 || nextCursor >= this.commandHistory.length) return;

    this.historyCursor = nextCursor;
    const newValue = nextCursor === -1 ? this.savedDraft : this.commandHistory[nextCursor];
    this.promptBuffer.set(newValue);
    const input = this.hiddenInput()?.nativeElement;
    if (input) {
      input.value = newValue;
      requestAnimationFrame(() =>
        input.setSelectionRange(input.value.length, input.value.length),
      );
    }
  }

  private autocomplete(): void {
    if (this.isBusy) return;
    const buffer = this.promptBuffer();
    if (!buffer) return;
    const candidates = ALL_COMMAND_NAMES.filter((n) => n.startsWith(buffer));
    if (candidates.length === 0) return;
    if (candidates.length === 1) {
      this.setPrompt(candidates[0] + ' ');
      return;
    }
    const prefix = longestCommonPrefix(candidates);
    if (prefix.length > buffer.length) {
      this.setPrompt(prefix);
    } else {
      const id = ++this.historyCounter;
      this.history.update((h) => [
        ...h,
        {
          id,
          input: buffer,
          isTypingInput: false,
          lines: [
            { key: `ac-${id}`, type: 'output', content: candidates.join('   ') },
          ],
        },
      ]);
      requestAnimationFrame(() => this.scrollToBottom());
    }
  }

  private setPrompt(value: string): void {
    this.promptBuffer.set(value);
    const input = this.hiddenInput()?.nativeElement;
    if (input) {
      input.value = value;
      requestAnimationFrame(() =>
        input.setSelectionRange(input.value.length, input.value.length),
      );
    }
  }

  private cancelCurrentLine(): void {
    if (this.isBusy) {
      this.cancelled = true;
      setTimeout(() => {
        this.cancelled = false;
        this.isBusy = false;
      }, 80);
    } else {
      const id = ++this.historyCounter;
      const current = this.promptBuffer();
      this.promptBuffer.set('');
      const input = this.hiddenInput()?.nativeElement;
      if (input) input.value = '';
      this.history.update((h) => [
        ...h,
        {
          id,
          input: current + '^C',
          isTypingInput: false,
          lines: [],
        },
      ]);
      requestAnimationFrame(() => this.scrollToBottom());
    }
  }

  private async runCommandAnimated(
    cmd: TerminalCommand,
    typeSpeedMs: number,
    registerInHistory = true,
  ): Promise<void> {
    this.isBusy = true;
    if (registerInHistory && !this.commandHistory.includes(cmd.input)) {
      this.commandHistory.push(cmd.input);
    }
    try {
      await this.executeCommand(cmd, typeSpeedMs);
    } finally {
      this.isBusy = false;
      requestAnimationFrame(() => this.focusInput());
    }
  }

  private async executeCommand(cmd: TerminalCommand, typeSpeedMs: number): Promise<void> {
    const id = ++this.historyCounter;
    const block: HistoryBlock = {
      id,
      input: '',
      isTypingInput: true,
      lines: [],
    };
    this.history.update((h) => [...h, block]);

    await this.typeInto(
      cmd.input,
      (_char, soFar) => {
        this.history.update((h) =>
          h.map((b) => (b.id === id ? { ...b, input: soFar } : b)),
        );
      },
      typeSpeedMs,
    );

    if (this.cancelled) return;
    this.history.update((h) =>
      h.map((b) => (b.id === id ? { ...b, isTypingInput: false } : b)),
    );
    this.scrollToBottom();

    for (const line of cmd.lines) {
      if (this.cancelled) return;
      await this.wait(line.delay ?? (typeSpeedMs ? 180 : 0));
      if (this.cancelled) return;
      const key = `${id}-${Math.random().toString(36).slice(2, 8)}`;
      this.history.update((h) =>
        h.map((b) =>
          b.id === id ? { ...b, lines: [...b.lines, { key, type: line.type, content: '' }] } : b,
        ),
      );
      this.scrollToBottom();
      await this.typeInto(
        line.content,
        (_ch, soFar) => {
          this.history.update((h) =>
            h.map((b) => {
              if (b.id !== id) return b;
              const lines = [...b.lines];
              const last = lines[lines.length - 1];
              if (last) lines[lines.length - 1] = { ...last, content: soFar };
              return { ...b, lines };
            }),
          );
        },
        Math.max(6, Math.floor((typeSpeedMs ?? 0) * 0.55)),
      );
    }

    // Special side-effect for contact: smooth-scroll to contacto section
    if (cmd.input === 'contact --open linkedin') {
      try {
        const el = document.getElementById('contacto');
        if (el) {
          await this.wait(400);
          this.renderer.setProperty(document.documentElement, 'scrollTop', el.offsetTop - 96);
          this.renderer.setProperty(document.body, 'scrollTop', el.offsetTop - 96);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch {}
    }
    // Special side-effect for architecture: scroll to architecture section
    if (cmd.input === 'architecture show --current') {
      try {
        const el = document.getElementById('arquitectura');
        if (el) {
          await this.wait(500);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch {}
    }
  }

  private async typeInto(
    text: string,
    onChar: (char: string, soFar: string) => void,
    speedMs: number,
  ): Promise<void> {
    if (speedMs === 0) {
      onChar('', text);
      return;
    }
    let soFar = '';
    for (const ch of text) {
      if (this.cancelled) return;
      soFar += ch;
      onChar(ch, soFar);
      this.scrollToBottom();
      const jitter = speedMs + (Math.random() > 0.7 ? Math.random() * speedMs : 0);
      await this.wait(jitter);
    }
  }

  private caretBump(): void {
    const caret = this.caretRef()?.nativeElement;
    if (!caret) return;
    gsap.fromTo(
      caret,
      { scaleX: 1, scaleY: 1 },
      { scaleX: 1.3, scaleY: 1.2, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
    );
  }

  private scrollToBottom(): void {
    const screen = this.screenRef()?.nativeElement;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }

  private wait(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
}

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  let prefix = values[0];
  for (let i = 1; i < values.length; i++) {
    while (!values[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
