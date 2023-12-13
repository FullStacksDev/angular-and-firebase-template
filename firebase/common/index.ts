export const DEFAULT_FIREBASE_REGION = 'europe-west2' as const;

export const FIRESTORE_COLLECTION_NAMES: Record<string, string> = {};

export type WithFirestoreId = {
  id: string;
};
