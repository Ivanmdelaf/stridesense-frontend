import { Routes } from '@angular/router';

export const SESSIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sessions-list.component').then(m => m.SessionsListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./session-form.component').then(m => m.SessionFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./session-edit.component').then(m => m.SessionEditComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./session-detail.component').then(m => m.SessionDetailComponent),
  },
];
