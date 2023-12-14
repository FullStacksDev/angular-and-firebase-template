export const DEFAULT_FIREBASE_REGION = 'europe-west2' as const;

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
}
