if (!process.env.GCLOUD_PROJECT) {
  throw new Error('Missing GCLOUD_PROJECT env var');
}
export const TEST_PROJECT_ID = process.env.GCLOUD_PROJECT;
