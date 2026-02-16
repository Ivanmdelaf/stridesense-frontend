import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Session } from '../../domain/entities/session.entity';

// --- State model ---
export interface SessionsStateModel {
  sessions: Session[];
  selectedSession: Session | null;
  loading: boolean;
  error: string | null;
}

// --- Actions ---
export class LoadSessions {
  static readonly type = '[Sessions] Load Sessions';
}

export class SetSessions {
  static readonly type = '[Sessions] Set Sessions';
  constructor(public payload: Session[]) {}
}

export class AddSession {
  static readonly type = '[Sessions] Add Session';
  constructor(public payload: Session) {}
}

export class SelectSession {
  static readonly type = '[Sessions] Select Session';
  constructor(public id: string) {}
}

export class ClearSessions {
  static readonly type = '[Sessions] Clear Sessions';
}

export class SetSessionsError {
  static readonly type = '[Sessions] Set Error';
  constructor(public error: string) {}
}

// --- State ---
@State<SessionsStateModel>({
  name: 'sessions',
  defaults: {
    sessions: [],
    selectedSession: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class SessionsState {
  @Selector()
  static sessions(state: SessionsStateModel): Session[] {
    return state.sessions;
  }

  @Selector()
  static selectedSession(state: SessionsStateModel): Session | null {
    return state.selectedSession;
  }

  @Selector()
  static loading(state: SessionsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: SessionsStateModel): string | null {
    return state.error;
  }

  @Action(LoadSessions)
  loadSessions(ctx: StateContext<SessionsStateModel>): void {
    ctx.patchState({ loading: true, error: null });
  }

  @Action(SetSessions)
  setSessions(ctx: StateContext<SessionsStateModel>, action: SetSessions): void {
    ctx.patchState({ sessions: action.payload, loading: false });
  }

  @Action(AddSession)
  addSession(ctx: StateContext<SessionsStateModel>, action: AddSession): void {
    const sessions = [...ctx.getState().sessions, action.payload];
    ctx.patchState({ sessions });
  }

  @Action(SelectSession)
  selectSession(ctx: StateContext<SessionsStateModel>, action: SelectSession): void {
    const selected = ctx.getState().sessions.find(s => s.id === action.id) ?? null;
    ctx.patchState({ selectedSession: selected });
  }

  @Action(ClearSessions)
  clearSessions(ctx: StateContext<SessionsStateModel>): void {
    ctx.patchState({ sessions: [], selectedSession: null, error: null });
  }

  @Action(SetSessionsError)
  setError(ctx: StateContext<SessionsStateModel>, action: SetSessionsError): void {
    ctx.patchState({ error: action.error, loading: false });
  }
}
