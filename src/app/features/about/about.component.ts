import { Component } from '@angular/core';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { EDUCATION, EXPERIENCE, PERSON } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [GsapRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  protected readonly person = PERSON;
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;
}
