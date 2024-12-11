import { computed, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { createLogger } from '@app-shared/logger';
import { User } from '@common';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
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

const logger = createLogger('AuthStore');

export type AuthStore = InstanceType<typeof AuthStore>;

export const AuthStore = signalStore(
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
            logger.error('Error getting auth data:', error);
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
          tap((action) => logger.log(`manageStream - action = ${action}`)),
          tap((action) => (action === 'connect' ? setConnecting() : null)),
          switchMap((action) =>
            action === 'connect' ? connectedStream$() : disconnectedStream$(),
          ),
        ),
      ),
    };
  }),
  withProps((store) => ({
    waitUntilConnected$: toObservable(store.status).pipe(
      tap((status) => logger.log('waitUntilConnected$ - status =', status)),
      filter((status) => status === 'connected'),
      shareReplay(1),
    ),
    user$: toObservable(store.user),
  })),
  withHooks({
    onInit(store) {
      effect(() => logger.log('State:', getState(store)));

      store.manageStream('connect');
    },
  }),
);
