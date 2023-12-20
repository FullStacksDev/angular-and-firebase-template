import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  template: ` <h1 class="mat-h1 text-center">About</h1> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
