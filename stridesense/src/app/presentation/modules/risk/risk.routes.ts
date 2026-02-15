import { Routes } from '@angular/router';

export const RISK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./risk-overview.component').then(m => m.RiskOverviewComponent),
  },
];
