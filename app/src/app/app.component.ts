import { CommonModule } from '@angular/common';
import { Component, NgZone, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { httpsCallable$, injectFunctions } from '@app-shared/firebase/functions';
import { injectRtdb, objectVal$ } from '@app-shared/firebase/rtdb';
import { RuntimeService } from '@app-shared/runtime.service';
import { ref } from 'firebase/database';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, MatSnackBarModule],
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
  readonly #runtimeService = inject(RuntimeService);
  readonly #snackBar = inject(MatSnackBar);
  readonly #functions = injectFunctions();
  readonly #rtdb = injectRtdb();

  title = 'app';

  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        this.informUserOfUpdate();
      });

    console.log('*** this.#runtimeService.isServer = ', this.#runtimeService.isServer);

    if (!this.#runtimeService.isServer) {
      inject(NgZone).runOutsideAngular(() => {
        this.helloWorldFunction().subscribe((result) => {
          console.log('Result from calling the updateServerLastTimestamp function:', result);
        });

        objectVal$(ref(this.#rtdb, 'server')).subscribe((data) => {
          console.log('Result from RTDB:', data);
        });
      });
    }
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

  private helloWorldFunction(): Observable<unknown> {
    const fn = httpsCallable$(this.#functions, 'updateServerLastTimestamp', {
      timeout: 5_000,
    });
    return fn();
  }
}
