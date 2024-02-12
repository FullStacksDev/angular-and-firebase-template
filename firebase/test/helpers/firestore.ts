import { parseHost } from 'ufo';

export function getFirestoreMeta(projectId: string) {
  const { hostname: host, port } = parseHost(process.env.FIRESTORE_EMULATOR_HOST);

  if (!host || !port) {
    throw new Error('Could not parse host and/or port from FIRESTORE_EMULATOR_HOST');
  }

  const coverageUrl = `http://${host}:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

  return {
    host,
    port: Number(port),
    coverageUrl,
  };
}
