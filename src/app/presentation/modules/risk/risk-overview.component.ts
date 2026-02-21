import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RiskState, LoadRisk } from '../../state/risk.state';

const LEVEL_ES: Record<string, string> = {
  low: 'BAJO',
  medium: 'MEDIO',
  high: 'ALTO',
};

@Component({
  selector: 'app-risk-overview',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './risk-overview.component.html',
  styleUrl: './risk-overview.component.scss',
})
export class RiskOverviewComponent implements OnInit {
  private readonly store = inject(Store);

  summary$  = this.store.select(RiskState.summary);
  loading$  = this.store.select(RiskState.loading);
  error$    = this.store.select(RiskState.error);

  showRiskLegend = false;
  showMlLegend   = false;

  translateLevel(level: string): string {
    return LEVEL_ES[level] ?? level.toUpperCase();
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadRisk());
  }

  reload(): void {
    this.store.dispatch(new LoadRisk());
  }
}
