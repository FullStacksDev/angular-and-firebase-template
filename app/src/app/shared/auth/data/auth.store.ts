import { Injectable, computed, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from '@common';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, filter, finalize, pipe, shareReplay, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

type DisconnectedState = {
  status: 'disconnected';
  user: null;
  error: null;
};

type ConnectingState = {
  status: 'connecting';
  user: null;
  error: null;
};

type ConnectedState = {
  status: 'connected';
  user: User | null;
  error: null;
};

type ErrorState = {
  status: 'error';
  user: null;
  error: string;
};

type AuthState = DisconnectedState | ConnectingState | ConnectedState | ErrorState;

const initialState: AuthState = {
  status: 'disconnected',
  user: null,
  error: null,
};

const _AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withComputed((store) => {
    return {
      isAuthenticated: computed(() => Boolean(store.user())),
    };
  }),
  withMethods((store) => {
    const authService = inject(AuthService);

    // ---
    // Internal methods:

    const setConnecting = () => {
      const newState: ConnectingState = { status: 'connecting', user: null, error: null };
      patchState(store, newState);
    };

    const setConnected = (user: User | null) => {
      const newState: ConnectedState = { status: 'connected', user, error: null };
      patchState(store, newState);
    };

    const setDisconnected = () => {
      const newState: DisconnectedState = { status: 'disconnected', user: null, error: null };
      patchState(store, newState);
    };

    const setError = (error: string) => {
      const newState: ErrorState = { status: 'error', user: null, error };
      patchState(store, newState);
    };

    const connectedStream$ = () => {
      return authService.user$.pipe(
        tapResponse({
          next: (user) => setConnected(user),
          error: (error) => {
            console.error('[AuthStore] Error getting auth data:', error);
            setError('Failed to fetch auth info');
          },
        }),
      );
    };

    const disconnectedStream$ = () => {
      return EMPTY.pipe(finalize(() => setDisconnected()));
    };

    // ---

    return {
      manageStream: rxMethod<'connect' | 'disconnect'>(
        pipe(
          tap((action) => console.log(`[AuthStore] #manageStream - action = ${action}`)),
          tap((action) => (action === 'connect' ? setConnecting() : null)),
          switchMap((action) =>
            action === 'connect' ? connectedStream$() : disconnectedStream$(),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      effect(() => console.log('[AuthStore] State:', getState(store)));

      store.manageStream('connect');
    },
  }),
);

@Injectable({ providedIn: 'root' })
export class AuthStore extends _AuthStore {
  readonly waitUntilConnected$ = toObservable(this.status).pipe(
    tap((status) => console.log('[AuthStore] waitUntilConnected - status =', status)),
    filter((status) => status === 'connected'),
    shareReplay(1),
  );

  readonly user$ = toObservable(this.user);
}
