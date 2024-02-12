import { parseHost } from 'ufo';

export function getRtdbMeta(databaseName: string) {
  const { hostname: host, port } = parseHost(process.env.FIREBASE_DATABASE_EMULATOR_HOST);

  if (!host || !port) {
    throw new Error('Could not parse host and/or port from FIREBASE_DATABASE_EMULATOR_HOST');
  }

  const coverageUrl = `http://${host}:${port}/.inspect/coverage?ns=${databaseName}`;

  return {
    host,
    port: Number(port),
    coverageUrl,
  };
}
