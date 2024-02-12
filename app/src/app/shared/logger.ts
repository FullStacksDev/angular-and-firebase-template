import { consola } from 'consola';
import { environment } from '../../environments/environment';

consola.level = environment.logLevel;

export const createLogger = (tag: string) => consola.withTag(tag);
