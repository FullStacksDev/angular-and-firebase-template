import { bootstrapApplication } from '@angular/platform-browser';
import { consola } from 'consola';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err: unknown) => consola.error(err));
