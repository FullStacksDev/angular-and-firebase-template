import {
  RulesTestEnvironment,
  assertFails,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, setDoc, setLogLevel } from 'firebase/firestore';
import { createWriteStream, readFileSync } from 'node:fs';
import { get as httpGet } from 'node:http';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';
import { TEST_PROJECT_ID } from '../helpers/constants';
import { getFirestoreMeta } from '../helpers/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests as needed).
  setLogLevel('error');
  const { host, port } = getFirestoreMeta(TEST_PROJECT_ID);
  testEnv = await initializeTestEnvironment({
    projectId: TEST_PROJECT_ID,
    firestore: {
      host,
      port,
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();

  // Write the coverage report to a file
  const { coverageUrl } = getFirestoreMeta(TEST_PROJECT_ID);
  const coverageFile = './firestore-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    httpGet(coverageUrl, (res) => {
      res.pipe(fstream, { end: true });
      res.on('end', resolve);
      res.on('error', reject);
    });
  });
  console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore security rules', () => {
  test('does not allow any reads, writes or deletes to an unused collection by an unauthenticated user', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const docRef = doc(db, 'unused/1');

    await assertFails(getDoc(docRef));

    await assertFails(setDoc(docRef, { name: 'someone' }));

    await assertFails(deleteDoc(docRef));
  });

  test('does not allow any reads, writes or deletes to an unused collection by an authenticated user', async () => {
    const db = testEnv.authenticatedContext('alice').firestore();
    const docRef = doc(db, 'unused/1');

    await assertFails(getDoc(docRef));

    await assertFails(setDoc(docRef, { name: 'someone' }));

    await assertFails(deleteDoc(docRef));
  });
});
