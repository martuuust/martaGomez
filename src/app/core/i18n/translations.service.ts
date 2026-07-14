import { Injectable, signal } from "@angular/core";
import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";

const translations: Record<Lang, Record<string, string>> = { es, en };

@Injectable({ providedIn: "root" })
export class TranslationsService {
  currentLang = signal<Lang>("es");
  private translations = translations[this.currentLang()];

  constructor() {
    const browserLang = navigator.language?.slice(0, 2) as Lang;
    if (browserLang && translations[browserLang]) {
      this.currentLang.set(browserLang);
      this.translations = translations[browserLang];
    }
  }

  translate(key: string): string {
    return this.translations[key] ?? key;
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    this.translations = translations[lang];
  }
}
