import { inject, Injectable } from '@angular/core';
import { injectAuth, user$ } from '@app-shared/firebase/auth';
import { createLogger } from '@app-shared/logger';
import { RuntimeService } from '@app-shared/runtime.service';
import { User } from '@common';
import { map, Observable, of, tap } from 'rxjs';

const logger = createLogger('AuthService');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #runtimeService = inject(RuntimeService);
  readonly #auth = injectAuth();

  readonly #firebaseUser$: Observable<User | null> = user$(this.#auth).pipe(
    tap((firebaseUser) => logger.log('Received auth user data from Firebase:', firebaseUser)),
    map((firebaseUser) => {
      if (firebaseUser) {
        return {
          id: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          lastSignInTime: firebaseUser.metadata.lastSignInTime ?? null,
          creationTime: firebaseUser.metadata.creationTime ?? null,
        };
      } else {
        return null;
      }
    }),
  );

  readonly #nullUser$ = of(null).pipe(tap(() => logger.log('null user set')));

  readonly user$: Observable<User | null> = this.#runtimeService.isServer
    ? this.#nullUser$
    : this.#firebaseUser$;
}
