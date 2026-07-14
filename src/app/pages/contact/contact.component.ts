import { Component } from "@angular/core";
import { TranslatePipe } from "../../core/i18n/translate.pipe";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {}
