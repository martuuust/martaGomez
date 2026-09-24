import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { PERSON, SOCIALS } from '../../shared/data/portfolio.data';
import { environment } from '../../../environments/environment';

type SubmitStatus = 'idle' | 'sending' | 'ok' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, GsapHoverDirective, GsapRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  protected readonly person = PERSON;
  protected readonly socials = SOCIALS;

  /** False hasta que Marta pegue la access key de Web3Forms. */
  protected readonly formConfigured = !!environment.web3formsAccessKey.trim();

  protected readonly status = signal<SubmitStatus>('idle');

  private readonly http = inject(HttpClient);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    subject: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(12)],
    }),
  });

  protected async onSubmit(): Promise<void> {
    if (!this.formConfigured) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    const { name, email, subject, message } = this.form.getRawValue();

    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; message?: string }>(
          'https://api.web3forms.com/submit',
          {
            access_key: environment.web3formsAccessKey,
            name,
            email,
            subject,
            message,
            from_name: 'Portfolio Marta Gómez',
          },
        ),
      );

      if (!res.success) {
        throw new Error(res.message ?? 'Web3Forms rejected the submission');
      }

      this.status.set('ok');
      this.form.reset();
      setTimeout(() => this.status.set('idle'), 8000);
    } catch {
      this.status.set('error');
    }
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
