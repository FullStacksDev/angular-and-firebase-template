import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [],
  template: ` <h1 class="text-center">About</h1> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
