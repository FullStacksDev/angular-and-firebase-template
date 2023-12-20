import { Routes } from '@angular/router';
import { AboutPageComponent } from './feature/about-page.component';
import { HomePageComponent } from './feature/home-page.component';
import { WebsiteShellComponent } from './website-shell.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent },
    ],
  },
];

export default routes;
