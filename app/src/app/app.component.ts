import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { createLogger } from '@app-shared/logger';
import { RuntimeService } from '@app-shared/runtime.service';
import { filter } from 'rxjs';

const logger = createLogger('AppComponent');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule],
  template: ` <router-outlet /> `,
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

    logger.log('this.#runtimeService.isServer =', this.#runtimeService.isServer);
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
