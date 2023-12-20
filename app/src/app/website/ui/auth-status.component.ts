import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@app-shared/auth/data/auth.store';
import { LogoutService } from '@app-shared/auth/data/logout.service';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    @if (isAuthenticated()) {
      <button mat-button (click)="logOut()">Log out</button>
    } @else {
      <a mat-button [routerLink]="['/login']">Log in</a>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthStatusComponent {
  readonly #authStore = inject(AuthStore);
  readonly #logoutService = inject(LogoutService);

  readonly isAuthenticated = this.#authStore.isAuthenticated;

  async logOut(): Promise<void> {
    await this.#logoutService.logOut();
  }
}
