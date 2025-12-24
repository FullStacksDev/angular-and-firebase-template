import { initializeApp } from 'firebase-admin/app';
import { setGlobalOptions } from 'firebase-functions';

setGlobalOptions({ maxInstances: 5 });

initializeApp();
