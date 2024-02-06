import { Auth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';
import { FIREBASE_AUTH } from './auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function firestoreFactory(_: Auth) {
  const firestore = getFirestore();
  if (environment.useEmulators) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }
  return firestore;
}

export const [injectFirestore, , FIREBASE_FIRESTORE] = createInjectionToken(firestoreFactory, {
  deps: [FIREBASE_AUTH],
});
