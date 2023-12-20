import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { RuntimeService } from '@app-shared/runtime.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSnackBarModule],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  readonly #runtimeService = inject(RuntimeService);
  readonly #snackBar = inject(MatSnackBar);

  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        this.informUserOfUpdate();
      });

    console.log('*** this.#runtimeService.isServer = ', this.#runtimeService.isServer);
  }
  private informUserOfUpdate(): void {
    this.#snackBar
      .open(`App update available`, 'Refresh', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
      .onAction()
      .subscribe(() => {
        window.location.reload();
      });
  }
}
