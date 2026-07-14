import { Component } from "@angular/core";
import { TranslatePipe } from "../../core/i18n/translate.pipe";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
