import {
  RulesTestEnvironment,
  assertFails,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteObject, getDownloadURL, ref, updateMetadata } from 'firebase/storage';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';
import { TEST_PROJECT_ID } from '../helpers/constants';
import { getStorageMeta } from '../helpers/storage';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const { host, port } = getStorageMeta();
  testEnv = await initializeTestEnvironment({
    projectId: TEST_PROJECT_ID,
    storage: {
      port,
      host,
      rules: readFileSync('storage.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearStorage();
});

describe('Storage security rules', () => {
  test('does not allow any reads, writes or deletes to an unused object by an unauthenticated user', async () => {
    const storage = testEnv.unauthenticatedContext().storage();
    const objectRef = ref(storage, 'unused.jpg');

    await assertFails(getDownloadURL(objectRef));

    await assertFails(updateMetadata(objectRef, { cacheControl: 'public, max-age=300' }));

    await assertFails(deleteObject(objectRef));
  });

  test('does not allow any reads, writes or deletes to an unused object by an authenticated user', async () => {
    const storage = testEnv.authenticatedContext('alice').storage();
    const objectRef = ref(storage, 'unused.jpg');

    await assertFails(getDownloadURL(objectRef));

    await assertFails(updateMetadata(objectRef, { cacheControl: 'public, max-age=300' }));

    await assertFails(deleteObject(objectRef));
  });
});
