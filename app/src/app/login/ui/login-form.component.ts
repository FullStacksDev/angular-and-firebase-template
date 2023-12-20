import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  template: `
    <form [formGroup]="formGroup" #form="ngForm" (ngSubmit)="submit(form)" novalidate>
      <mat-card>
        <div class="mt-2 text-center">
          <mat-card-title>Login</mat-card-title>
        </div>
        <mat-card-content>
          <div class="mt-3 rounded bg-blue-100 px-3 py-2 text-center text-sm text-blue-700">
            We'll send you an email with a link to log in
            <br />
            (and automatically create a new account if needed)
          </div>

          <div class="mt-4">
            <mat-form-field class="w-full">
              <mat-label>Email address</mat-label>
              <input type="text" matInput formControlName="email" required autocomplete="email" />
              @if (email?.invalid) {
                <mat-error>{{ getEmailErrorMessage() }}</mat-error>
              }
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button class="mr-2" mat-raised-button color="primary" type="submit">
            Send login link
          </button>
        </mat-card-actions>
        <mat-card-footer>
          @if (processing()) {
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          }
        </mat-card-footer>
      </mat-card>
    </form>
  `,
  styles: ``,
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  private readonly _processing = signal(false);

  @Input({ required: true })
  set processing(processing: boolean) {
    this._processing.set(processing);
  }
  get processing(): Signal<boolean> {
    return this._processing;
  }

  @Output() submitted = new EventEmitter<string>();

  readonly formGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.formGroup.get('email');
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email?.hasError('email')) {
      return 'Not a valid email';
    }

    return null;
  }

  submit(form: FormGroupDirective) {
    const { email } = this.formGroup.value;

    if (form.valid && email) {
      this.submitted.emit(email);

      form.resetForm();
      this.formGroup.reset();
    }
  }
}
