import { Component, signal, effect } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./shell.component.html",
  styleUrl: "./shell.component.css"
})
export class ShellComponent {
  isDarkMode = signal<boolean>(false);

  constructor() {
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
}
