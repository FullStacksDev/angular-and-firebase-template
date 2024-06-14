import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./website/website.routes'),
  },
];
