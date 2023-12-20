import { Routes } from '@angular/router';
import { LoaderShellComponent } from './loader-shell.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes'),
  },
  // This is a special route used for Firebase Hosting (to serve the catch all rule) and for the
  // default PWA index.html file, so all non-prerendered views have an empty loading shell to start
  // from (separate to the static prerendered pages).
  {
    path: 'loader',
    component: LoaderShellComponent,
  },
  {
    path: '',
    loadChildren: () => import('./website/website.routes'),
  },
];
