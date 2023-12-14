import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginFlowComponent } from './login-flow.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  template: `
    @defer {
      <section class="flex justify-center py-8">
        <app-login-flow />
      </section>
    } @loading (after 80ms) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatProgressBarModule, LoginFlowComponent],
})
export class LoginPageComponent {}
