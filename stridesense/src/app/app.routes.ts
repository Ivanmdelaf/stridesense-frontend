import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./presentation/modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'sessions',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/modules/sessions/sessions.routes').then(m => m.SESSIONS_ROUTES),
  },
  {
    path: 'risk',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/modules/risk/risk.routes').then(m => m.RISK_ROUTES),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./presentation/modules/profile/profile.routes').then(m => m.PROFILE_ROUTES),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
