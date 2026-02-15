import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserState } from '../../state/user.state';
import { SessionsState, LoadSessions } from '../../state/sessions.state';
import { RiskState, LoadRisk } from '../../state/risk.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly store = inject(Store);

  user$       = this.store.select(UserState.user);
  sessions$   = this.store.select(SessionsState.sessions);
  sessionsLoading$ = this.store.select(SessionsState.loading);
  riskSummary$ = this.store.select(RiskState.summary);
  riskLoading$ = this.store.select(RiskState.loading);

  ngOnInit(): void {
    this.store.dispatch([new LoadSessions(), new LoadRisk()]);
  }
}
