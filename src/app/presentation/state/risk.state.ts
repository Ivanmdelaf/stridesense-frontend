import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap, catchError, EMPTY } from 'rxjs';
import { RiskLevel, RiskSummary } from '../../domain/entities/risk.entity';
import { GetRiskUseCase } from '../../domain/use-cases/risk/get-risk.use-case';

// --- State model ---
export interface RiskStateModel {
  summary: RiskSummary | null;
  loading: boolean;
  error: string | null;
}

// --- Actions ---
export class LoadRisk {
  static readonly type = '[Risk] Load Risk';
}

export class SetRisk {
  static readonly type = '[Risk] Set Risk';
  constructor(public payload: RiskSummary) {}
}

export class ClearRisk {
  static readonly type = '[Risk] Clear Risk';
}

export class SetRiskError {
  static readonly type = '[Risk] Set Error';
  constructor(public error: string) {}
}

// --- State ---
@State<RiskStateModel>({
  name: 'risk',
  defaults: {
    summary: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class RiskState {
  constructor(private readonly getRiskUseCase: GetRiskUseCase) {}

  @Selector()
  static summary(state: RiskStateModel): RiskSummary | null {
    return state.summary;
  }

  @Selector()
  static overallLevel(state: RiskStateModel): RiskLevel | null {
    return state.summary?.overallLevel ?? null;
  }

  @Selector()
  static loading(state: RiskStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: RiskStateModel): string | null {
    return state.error;
  }

  @Action(LoadRisk)
  loadRisk(ctx: StateContext<RiskStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.getRiskUseCase.execute().pipe(
      tap((summary) => ctx.patchState({ summary, loading: false })),
      catchError((err) => {
        ctx.patchState({ error: err.message ?? 'Error loading risk', loading: false });
        return EMPTY;
      }),
    );
  }

  @Action(SetRisk)
  setRisk(ctx: StateContext<RiskStateModel>, action: SetRisk): void {
    ctx.patchState({ summary: action.payload, loading: false });
  }

  @Action(ClearRisk)
  clearRisk(ctx: StateContext<RiskStateModel>): void {
    ctx.patchState({ summary: null, error: null });
  }

  @Action(SetRiskError)
  setError(ctx: StateContext<RiskStateModel>, action: SetRiskError): void {
    ctx.patchState({ error: action.error, loading: false });
  }
}
