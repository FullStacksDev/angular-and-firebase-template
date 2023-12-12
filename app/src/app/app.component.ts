import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule],
  template: `
    <h1 class="text-3xl font-bold underline">Welcome to {{ title }}</h1>
    <div>
      <mat-slide-toggle>Toggle me!</mat-slide-toggle>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'app';
}
