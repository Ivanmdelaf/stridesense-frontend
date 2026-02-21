import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Session, CreateSessionPayload, UpdateSessionPayload } from '../../domain/entities/session.entity';
import { CreateSessionUseCase } from '../../domain/use-cases/sessions/create-session.use-case';
import { GetSessionsUseCase } from '../../domain/use-cases/sessions/get-sessions.use-case';
import { DeleteSessionUseCase } from '../../domain/use-cases/sessions/delete-session.use-case';
import { UpdateSessionUseCase } from '../../domain/use-cases/sessions/update-session.use-case';

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
  constructor(public payload: CreateSessionPayload) {}
}

export class SelectSession {
  static readonly type = '[Sessions] Select Session';
  constructor(public id: string) {}
}

export class UpdateSession {
  static readonly type = '[Sessions] Update Session';
  constructor(public id: string, public payload: UpdateSessionPayload) {}
}

export class DeleteSession {
  static readonly type = '[Sessions] Delete Session';
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
  constructor(
    private readonly createSession: CreateSessionUseCase,
    private readonly getSessions: GetSessionsUseCase,
    private readonly deleteSession: DeleteSessionUseCase,
    private readonly updateSession: UpdateSessionUseCase,
  ) {}

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
  loadSessions(ctx: StateContext<SessionsStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.getSessions.execute().pipe(
      tap((sessions) => ctx.patchState({ sessions, loading: false })),
      catchError((err) => {
        ctx.patchState({ error: err.message ?? 'Error loading sessions', loading: false });
        return EMPTY;
      }),
    );
  }

  @Action(SetSessions)
  setSessions(ctx: StateContext<SessionsStateModel>, action: SetSessions): void {
    ctx.patchState({ sessions: action.payload, loading: false });
  }

  @Action(AddSession)
  addSession(ctx: StateContext<SessionsStateModel>, action: AddSession) {
    ctx.patchState({ loading: true, error: null });
    return this.createSession.execute(action.payload).pipe(
      tap((session) => {
        const sessions = [...ctx.getState().sessions, session]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        ctx.patchState({ sessions, loading: false });
      }),
      catchError((err) => {
        ctx.patchState({ error: err.message ?? 'Error creating session', loading: false });
        return EMPTY;
      }),
    );
  }

  @Action(UpdateSession)
  editSession(ctx: StateContext<SessionsStateModel>, action: UpdateSession) {
    ctx.patchState({ loading: true, error: null });
    return this.updateSession.execute(action.id, action.payload).pipe(
      tap((updated) => {
        const sessions = ctx.getState().sessions
          .map(s => s.id === updated.id ? updated : s)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        ctx.patchState({ sessions, loading: false });
      }),
      catchError((err) => {
        ctx.patchState({ error: err.message ?? 'Error updating session', loading: false });
        return EMPTY;
      }),
    );
  }

  @Action(DeleteSession)
  removeSession(ctx: StateContext<SessionsStateModel>, action: DeleteSession) {
    ctx.patchState({ loading: true, error: null });
    return this.deleteSession.execute(action.id).pipe(
      tap(() => {
        const sessions = ctx.getState().sessions.filter(s => s.id !== action.id);
        ctx.patchState({ sessions, loading: false });
      }),
      catchError((err) => {
        ctx.patchState({ error: err.message ?? 'Error deleting session', loading: false });
        return EMPTY;
      }),
    );
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
