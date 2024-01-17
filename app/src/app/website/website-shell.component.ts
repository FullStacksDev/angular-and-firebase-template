import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthStatusComponent } from './ui/auth-status.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, AuthStatusComponent],
  template: `
    <div class="container mx-auto px-4">
      <header>
        <nav class="flex justify-between border-b py-2 ">
          <ul class="flex space-x-4">
            <li>
              <a mat-button [routerLink]="['/']">Home</a>
            </li>
            <li>
              <a mat-button [routerLink]="['/about']">About</a>
            </li>
          </ul>

          <ul class="flex space-x-4">
            @defer {
              <li class="float-right">
                <app-auth-status />
              </li>
            }
          </ul>
        </nav>
      </header>

      <main class="px-4 py-3">
        <router-outlet />
      </main>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteShellComponent {}
