import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { RuntimeService } from '@app-shared/runtime.service';
import { map, take } from 'rxjs';
import { AuthStore } from '../data/auth.store';

export function authGuard(allowOnly: 'authed' | 'not-authed'): CanMatchFn {
  console.log(`[authGuard] Factory called - allowOnly = ${allowOnly}`);

  return (route: Route) => {
    const runtimeService = inject(RuntimeService);
    const router = inject(Router);

    console.log(
      `[authGuard] Factory called - allowOnly = ${allowOnly}, route.path = ${route.path}`,
    );

    if (runtimeService.isServer) {
      console.log('[authGuard] Server side - render the /loader view instead');
      return router.createUrlTree(['/loader']);
    }

    const authStore = inject(AuthStore);

    return authStore.waitUntilConnected$.pipe(
      map(() => {
        const isAuthenticated = authStore.isAuthenticated();

        console.log(`[authGuard] After auth connected - isAuthenticated = ${isAuthenticated}`);

        switch (allowOnly) {
          case 'authed':
            return isAuthenticated
              ? true
              : router.createUrlTree(['/login'], {
                  queryParams: { return: router.getCurrentNavigation()?.extractedUrl?.toString() },
                });
          case 'not-authed':
            return isAuthenticated ? router.createUrlTree(['/']) : true;
          default:
            return false;
        }
      }),
      take(1),
    );
  };
}
