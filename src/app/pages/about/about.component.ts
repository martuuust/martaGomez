import { Component } from "@angular/core";
import { TranslatePipe } from "../../core/i18n/translate.pipe";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: "./about.component.html",
})
export class AboutComponent {}
