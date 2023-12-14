import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginFormComponent } from '../ui/login-form.component';
import { LoginFlowStore } from './login-flow.store';

@Component({
  selector: 'app-login-flow',
  standalone: true,
  imports: [MatSnackBarModule, LoginFormComponent],
  providers: [LoginFlowStore],
  template: `
    <div class="w-96">
      @if (status() === 'error') {
        <div class="my-2 rounded bg-red-100 px-3 py-2 text-center text-sm text-red-700">
          {{ error() }}
        </div>
      }

      <app-login-form
        [processing]="status() === 'processing'"
        (submitted)="onSubmit($event)"
      ></app-login-form>
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
