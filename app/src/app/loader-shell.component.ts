import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressBarModule],
  template: `
    <div>
      <mat-progress-bar mode="indeterminate" />
      <noscript class="p-4 text-center text-lg">
        Please enable JavaScript to continue using this application
      </noscript>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderShellComponent {}
