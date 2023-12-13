import { WithFirestoreId } from '@common';
import { Auth } from 'firebase/auth';
import { FirestoreDataConverter, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
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

export const [injectFirestore] = createInjectionToken(firestoreFactory, { deps: [FIREBASE_AUTH] });

export { collectionData as collectionData$, doc as doc$ } from 'rxfire/firestore';

export function buildConverter<T extends WithFirestoreId>(
  postProcessingFn?: (obj: T) => T,
): FirestoreDataConverter<T> {
  return {
    toFirestore: (obj) => {
      const { id, ...rest } = obj;
      return rest;
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);

      const obj = {
        id: snapshot.id,
        ...data,
      } as T;

      return postProcessingFn ? postProcessingFn(obj) : obj;
    },
  };
}
