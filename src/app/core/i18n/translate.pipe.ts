import { Pipe, PipeTransform } from "@angular/core";
import { TranslationsService } from "./translations.service";

@Pipe({
  name: "translate",
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private service: TranslationsService) {}

  transform(key: string): string {
    return this.service.translate(key);
  }
}
