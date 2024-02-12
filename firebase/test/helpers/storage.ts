import { parseHost } from 'ufo';

export function getStorageMeta() {
  const { hostname: host, port } = parseHost(process.env.FIREBASE_STORAGE_EMULATOR_HOST);

  if (!host || !port) {
    throw new Error('Could not parse host and/or port from FIREBASE_STORAGE_EMULATOR_HOST');
  }

  return {
    host,
    port: Number(port),
  };
}
