import { DEFAULT_FIREBASE_REGION } from '@common';
import { consola } from 'consola';
import { Auth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';
import { FIREBASE_AUTH } from './auth';

consola.log('DEFAULT_FIREBASE_REGION = ', DEFAULT_FIREBASE_REGION);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function functionsFactory(_: Auth) {
  const functions = getFunctions(undefined, DEFAULT_FIREBASE_REGION);
  if (environment.useEmulators) {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
  return functions;
}

export const [injectFunctions] = createInjectionToken(functionsFactory, {
  deps: [FIREBASE_AUTH],
});
