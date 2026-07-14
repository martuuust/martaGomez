import { Component, signal, effect } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { TranslatePipe } from "../../i18n/translate.pipe";
import { TranslationsService, type Lang } from "../../i18n/translations.service";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.css"
})
export class ShellComponent {
  isDarkMode = signal<boolean>(false);
  menuOpen = signal<boolean>(false);

  constructor(protected translations: TranslationsService) {
    effect(() => {
      const root = document.documentElement;
      if (this.isDarkMode()) {
        root.classList.add("dark-mode");
      } else {
        root.classList.remove("dark-mode");
      }
    });

    // Validar de forma segura la existencia de matchMedia en entornos de pruebas jsdom
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(prev => !prev);
  }

  toggleMenu(): void {
    this.menuOpen.update(prev => !prev);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLang(): void {
    const next: Lang = this.translations.currentLang() === "es" ? "en" : "es";
    this.translations.setLang(next);
  }
}
