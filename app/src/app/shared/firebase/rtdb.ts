import { Auth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';
import { FIREBASE_AUTH } from './auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function rtdbFactory(_: Auth) {
  const rtdb = getDatabase();
  if (environment.useEmulators) {
    connectDatabaseEmulator(rtdb, 'localhost', 9000);
  }
  return rtdb;
}

export const [injectRtdb] = createInjectionToken(rtdbFactory, { deps: [FIREBASE_AUTH] });
