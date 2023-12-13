import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { logger } from 'firebase-functions/v2';
import { onCall } from 'firebase-functions/v2/https';
import { DEFAULT_FIREBASE_REGION } from '../../common';

initializeApp();

export const updateServerLastTimestamp = onCall(
  {
    region: DEFAULT_FIREBASE_REGION,
  },
  async (request) => {
    const updatedBy = request.auth?.token.email ?? 'unknown';
    const now = new Date().toISOString();
    const updatedData = {
      lastTimestamp: now,
      lastUpdatedBy: updatedBy,
    };

    logger.debug(`Updating server last timestamp to ${now}`);
    await getDatabase().ref('server').update(updatedData);

    return updatedData;
  },
);
