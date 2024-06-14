import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h1 class="mat-headline-5 mt-8 text-center leading-normal">
      This is the
      <a class="underline decoration-dotted" href="https://fullstacks.dev">FullStacksDev</a>
      Angular and Firebase template running on Firebase
    </h1>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
