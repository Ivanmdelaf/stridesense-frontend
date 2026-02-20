import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SessionsState, LoadSessions } from '../../state/sessions.state';
import { RiskState, LoadRisk } from '../../state/risk.state';
import { Session } from '../../../domain/entities/session.entity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly store = inject(Store);

  sessions = this.store.selectSignal(SessionsState.sessions);
  sessionsLoading = this.store.selectSignal(SessionsState.loading);
  riskSummary = this.store.selectSignal(RiskState.summary);
  riskLoading = this.store.selectSignal(RiskState.loading);

  latestSession = computed<Session | null>(() => this.sessions()[0] ?? null);

  weeklyLoad = computed<number>(() => {
    const now = new Date();
    const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    return this.sessions()
      .filter(s => new Date(s.date) >= weekAgo && s.distanceKm != null)
      .reduce((sum, s) => sum + (s.distanceKm ?? 0), 0);
  });

  avgCadence = computed<number | null>(() => {
    const withCadence = this.sessions().filter(s => s.cadenceSpm != null);
    if (withCadence.length === 0) return null;
    const total = withCadence.reduce((sum, s) => sum + (s.cadenceSpm ?? 0), 0);
    return Math.round(total / withCadence.length);
  });

  riskDashOffset = computed<number>(() => {
    const circumference = 2 * Math.PI * 54;
    const score = this.riskSummary()?.overallScore ?? 0;
    return circumference - (circumference * score) / 100;
  });

  riskCircumference = 2 * Math.PI * 54;

  riskColor = computed<string>(() => {
    const level = this.riskSummary()?.overallLevel;
    if (level === 'high') return '#ff453a';
    if (level === 'medium') return '#ffb836';
    return '#34c759';
  });

  mlPrediction = computed(() => this.riskSummary()?.mlPrediction ?? null);

  mlCircumference = 2 * Math.PI * 40;

  mlDashOffset = computed<number>(() => {
    const circumference = 2 * Math.PI * 40;
    const score = this.riskSummary()?.mlPrediction?.score ?? 0;
    return circumference - (circumference * score) / 100;
  });

  mlColor = computed<string>(() => {
    const level = this.riskSummary()?.mlPrediction?.level;
    if (level === 'high') return '#ff453a';
    if (level === 'medium') return '#ffb836';
    return '#34c759';
  });

  ngOnInit(): void {
    this.store.dispatch([new LoadSessions(), new LoadRisk()]);
  }
}
