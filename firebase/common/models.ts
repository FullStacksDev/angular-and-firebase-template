export type WithId = { id: string };

export type User = Readonly<
  WithId & {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    lastSignInTime: string | null;
    creationTime: string | null;
  }
>;
