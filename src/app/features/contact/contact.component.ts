import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { PERSON, SOCIALS } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, GsapHoverDirective, GsapRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  protected readonly person = PERSON;
  protected readonly socials = SOCIALS;

  protected readonly sent = signal(false);

  readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    subject: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(12)],
    }),
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    const body = `Hola Marta,\n\n${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${this.person.email}?subject=${encodeURIComponent(
      subject ?? '',
    )}&body=${encodeURIComponent(body)}`;

    this.sent.set(true);
    this.form.reset();
    setTimeout(() => this.sent.set(false), 6000);
  }

  protected fieldError(field: keyof typeof this.form.controls): string {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control.hasError('email')) {
      return 'Introduce un email válido.';
    }
    return 'Demasiado corto.';
  }
}
