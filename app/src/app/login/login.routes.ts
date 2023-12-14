import { Routes } from '@angular/router';
import { authGuard } from '@app-shared/auth/util/auth.guard';
import { LoginPageComponent } from './feature/login-page.component';

const routes: Routes = [
  {
    path: '',
    canMatch: [authGuard('not-authed')],
    component: LoginPageComponent,
  },
];

export default routes;
