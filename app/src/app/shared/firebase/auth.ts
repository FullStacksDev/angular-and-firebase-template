import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';

// Initialise the Firebase app here because we expect Auth to be the first thing initialised
initializeApp(environment.firebaseConfig);

export function authFactory() {
  const auth = getAuth();
  if (environment.useEmulators) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
  }
  return auth;
}

export const [injectAuth, , FIREBASE_AUTH] = createInjectionToken(authFactory);

export { user as user$ } from 'rxfire/auth';
