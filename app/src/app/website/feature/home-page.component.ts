import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="mat-headline-5 mt-8 text-center">
      This is the FullStacks.dev Angular and Firebase template running on Firebase
    </h1>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
