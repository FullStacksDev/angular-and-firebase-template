import { Auth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';
import { FIREBASE_AUTH } from './auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function storageFactory(_: Auth) {
  const storage = getStorage();
  if (environment.useEmulators) {
    connectStorageEmulator(storage, 'localhost', 9199);
  }
  return storage;
}

export const [injectStorage, , FIREBASE_STORAGE] = createInjectionToken(storageFactory, {
  deps: [FIREBASE_AUTH],
});
