import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';

import { routes } from './app.routes';

// Presentation - State
import { UserState } from './presentation/state/user.state';
import { SessionsState } from './presentation/state/sessions.state';
import { RiskState } from './presentation/state/risk.state';

// Domain - Repository tokens
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { SESSION_REPOSITORY } from './domain/repositories/session.repository';
import { RISK_REPOSITORY } from './domain/repositories/risk.repository';

// Data - Repository implementations
import { UserRepositoryImpl } from './data/repositories/user.repository.impl';
import { SessionRepositoryImpl } from './data/repositories/session.repository.impl';
import { RiskRepositoryImpl } from './data/repositories/risk.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      [UserState, SessionsState, RiskState],
      withNgxsReduxDevtoolsPlugin()
    ),
    // Dependency Injection: bind interfaces to implementations
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    { provide: SESSION_REPOSITORY, useClass: SessionRepositoryImpl },
    { provide: RISK_REPOSITORY, useClass: RiskRepositoryImpl },
  ]
};
