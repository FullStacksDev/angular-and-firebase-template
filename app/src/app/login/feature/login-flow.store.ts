import { effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '@app-shared/auth/data/auth.store';
import { createLogger } from '@app-shared/logger';
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
import { exhaustMap, filter, from, map, pipe, take, tap } from 'rxjs';
import { LoginService } from '../data/login.service';

const localStorageKeyForEmail = 'emailForLogin';

type IdleState = {
  status: 'idle';
  error: null;
};

type ProcessingState = {
  status: 'processing';
  error: null;
};

type EmailSentState = {
  status: 'email_sent';
  error: null;
};

type CompletedState = {
  status: 'completed';
  error: null;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type LoginFlowState = IdleState | ProcessingState | EmailSentState | CompletedState | ErrorState;

const initialState: LoginFlowState = {
  status: 'idle',
  error: null,
};

const logger = createLogger('LoginFlowStore');

export type LoginFlowStore = InstanceType<typeof LoginFlowStore>;

export const LoginFlowStore = signalStore(
  withState<LoginFlowState>(initialState),
  withComputed(() => {
    const authStore = inject(AuthStore);

    return {
      user: authStore.user,
    };
  }),
  withMethods((store) => {
    const loginService = inject(LoginService);
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    // ---
    // Internal methods:

    const setProcessing = () => {
      const newState: ProcessingState = { status: 'processing', error: null };
      patchState(store, newState);
    };

    const setEmailSent = () => {
      const newState: EmailSentState = { status: 'email_sent', error: null };
      patchState(store, newState);
    };

    const setCompleted = () => {
      const newState: CompletedState = { status: 'completed', error: null };
      patchState(store, newState);
    };

    const setError = (error: string) => {
      const newState: ErrorState = { status: 'error', error };
      patchState(store, newState);
    };

    // ---

    return {
      triggerLoginLink: rxMethod<{ email: string }>(
        pipe(
          tap((params) => logger.log(`triggerLoginLink - email = ${params.email}`)),
          tap(() => setProcessing()),
          exhaustMap(({ email }) => {
            return from(loginService.triggerLoginLink(email, document.location.href)).pipe(
              take(1),
              tapResponse({
                next: () => {
                  // Save the email locally so we can use it for final step of logging in (when the user clicks the link in the email).
                  window.localStorage.setItem(localStorageKeyForEmail, email);

                  setEmailSent();
                },
                error: (error: string) => {
                  // TODO: here we catch _any_ error, including Angular errors. Maybe we should filter out and map these to user specific error messages (like we do for the auth error messages in login service?)
                  setError(error);
                },
              }),
            );
          }),
        ),
      ),
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      handleLoginLinkIfAvailable: rxMethod<void>(
        pipe(
          tap(() => logger.log('handleLoginLinkIfAvailable')),
          map(() => document.location.href),
          filter((url) => loginService.isLoginLink(url)),
          tap(() => setProcessing()),
          exhaustMap((url) => {
            let email = window.localStorage.getItem(localStorageKeyForEmail);

            while (!email) {
              email = window.prompt('Please provide your email for confirmation');
            }

            return from(loginService.handleLoginLink(url, email)).pipe(
              take(1),
              tapResponse({
                next: () => {
                  window.localStorage.removeItem(localStorageKeyForEmail);

                  // Note: completion of login is handled by the `effect` below, so we don't need to do anything else here.
                },
                error: (error: string) => {
                  // TODO: here we catch _any_ error, including Angular errors. Maybe we should filter out and map these to user specific error messages (like we do for the auth error messages in login service?)
                  setError(error);
                },
              }),
            );
          }),
        ),
      ),
      completeLogin: async () => {
        setCompleted();

        let url = route.snapshot.queryParamMap.get('return') ?? '/';
        // DO NOT redirect to an external URL (for security reasons).
        if (!url.startsWith('/')) {
          url = '/';
        }
        await router.navigateByUrl(url);
      },
    };
  }),
  withHooks({
    onInit(store) {
      effect(() => logger.log('State:', getState(store)));

      // Listen for changes to the user and trigger completion once we have one.
      effect(() => {
        const user = store.user();
        if (user) {
          untracked(() => {
            void store.completeLogin();
          });
        }
      });
    },
  }),
);
