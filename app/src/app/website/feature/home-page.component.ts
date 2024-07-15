import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h1 class="mat-headline-medium mt-8 text-center">
      This is the
      <a class="underline decoration-dotted" href="https://fullstacks.dev">FullStacksDev</a>
      Angular and Firebase template running on Firebase
    </h1>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
