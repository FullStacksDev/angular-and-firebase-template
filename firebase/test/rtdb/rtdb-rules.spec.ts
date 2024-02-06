import {
  RulesTestEnvironment,
  assertFails,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { get, ref, remove, set } from 'firebase/database';
import { createWriteStream, readFileSync } from 'node:fs';
import { get as httpGet } from 'node:http';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';
import { TEST_PROJECT_ID } from '../helpers/constants';
import { getRtdbMeta } from '../helpers/rtdb';

const DATABASE_NAME = 'demo-test-rtdb';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const { host, port } = getRtdbMeta(DATABASE_NAME);
  testEnv = await initializeTestEnvironment({
    projectId: TEST_PROJECT_ID,
    database: {
      port,
      host,
      rules: readFileSync('database.rules.json', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();

  // Write the coverage report to a file
  const { coverageUrl } = getRtdbMeta(DATABASE_NAME);
  const coverageFile = './rtdb-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    httpGet(coverageUrl, (res) => {
      res.pipe(fstream, { end: true });
      res.on('end', resolve);
      res.on('error', reject);
    });
  });

  console.log(`View database rule coverage information at ${coverageFile}\n`);
});

beforeEach(async () => {
  await testEnv.clearDatabase();
});

describe('RTDB security rules', () => {
  test('does not allow any reads, writes or deletes to an unused key by an unauthenticated user', async () => {
    const db = testEnv.unauthenticatedContext().database();
    const valueRef = ref(db, 'unusedKey');

    await assertFails(get(valueRef));

    await assertFails(set(valueRef, 'foo'));

    await assertFails(remove(valueRef));
  });

  test('does not allow any reads, writes or deletes to an unused key by an authenticated user', async () => {
    const db = testEnv.authenticatedContext('alice').database();
    const valueRef = ref(db, 'unusedKey');

    await assertFails(get(valueRef));

    await assertFails(set(valueRef, 'foo'));

    await assertFails(remove(valueRef));
  });
});
