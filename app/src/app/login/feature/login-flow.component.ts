import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '../ui/login-form.component';
import { LoginFlowStore } from './login-flow.store';

@Component({
  selector: 'app-login-flow',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatSnackBarModule, LoginFormComponent],
  providers: [LoginFlowStore],
  template: `
    <div class="flex justify-center">
      <a mat-button [routerLink]="['/']">
        <mat-icon>arrow_back</mat-icon>
        Home
      </a>
    </div>
    <div class="mt-6 w-[360px]">
      @if (status() === 'error') {
        <div class="my-2 rounded-sm bg-red-100 px-3 py-2 text-center text-sm text-red-700">
          {{ error() }}
        </div>
      }

      <app-login-form [processing]="status() === 'processing'" (submitted)="onSubmit($event)" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFlowComponent implements OnInit {
  readonly #store = inject(LoginFlowStore);
  readonly #snackBar = inject(MatSnackBar);

  readonly status = this.#store.status;
  readonly error = this.#store.error;

  constructor() {
    effect(() => {
      if (this.#store.status() === 'email_sent') {
        this.informUserOfEmailSent();
      }
    });
  }

  ngOnInit(): void {
    this.#store.handleLoginLinkIfAvailable();
  }

  onSubmit(email: string) {
    this.#store.triggerLoginLink({ email });
  }

  private informUserOfEmailSent(): void {
    this.#snackBar.open('Email with login link sent', undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
