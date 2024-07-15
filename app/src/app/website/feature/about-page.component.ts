import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  template: ` <h1 class="mat-headline-medium text-center">About</h1> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
