import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs';
import { EMPTY } from 'rxjs';
import { AuthCredentials, RegisterCredentials, User } from '../../domain/entities/user.entity';
import { LoginUseCase } from '../../domain/use-cases/auth/login.use-case';
import { RegisterUseCase } from '../../domain/use-cases/auth/register.use-case';
import { LogoutUseCase } from '../../domain/use-cases/auth/logout.use-case';

// --- State model ---
export interface UserStateModel {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// --- Actions ---
export class Login {
  static readonly type = '[User] Login';
  constructor(public credentials: AuthCredentials) {}
}

export class Register {
  static readonly type = '[User] Register';
  constructor(public data: RegisterCredentials) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}

export class SetUser {
  static readonly type = '[User] Set User';
  constructor(public payload: User) {}
}

export class ClearUser {
  static readonly type = '[User] Clear User';
}

export class SetUserLoading {
  static readonly type = '[User] Set Loading';
  constructor(public loading: boolean) {}
}

export class SetUserError {
  static readonly type = '[User] Set Error';
  constructor(public error: string | null) {}
}

// --- State ---
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly logoutUseCase: LogoutUseCase
  ) {}

  @Selector()
  static user(state: UserStateModel): User | null {
    return state.user;
  }

  @Selector()
  static loading(state: UserStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: UserStateModel): string | null {
    return state.error;
  }

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return state.user !== null;
  }

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, action: Login) {
    ctx.patchState({ loading: true, error: null });

    return this.loginUseCase.execute(action.credentials).pipe(
      tap((user) => {
        ctx.patchState({ user, loading: false });
      }),
      catchError((err) => {
        ctx.patchState({
          loading: false,
          error: err?.error?.message || 'Error al iniciar sesión',
        });
        return EMPTY;
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<UserStateModel>, action: Register) {
    ctx.patchState({ loading: true, error: null });

    return this.registerUseCase.execute(action.data).pipe(
      tap((user) => {
        ctx.patchState({ user, loading: false });
      }),
      catchError((err) => {
        ctx.patchState({
          loading: false,
          error: err?.error?.message || 'Error al registrar usuario',
        });
        return EMPTY;
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    this.logoutUseCase.execute();
    ctx.patchState({ user: null, loading: false, error: null });
  }

  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetUser): void {
    ctx.patchState({ user: action.payload, loading: false });
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<UserStateModel>): void {
    ctx.patchState({ user: null, loading: false });
  }

  @Action(SetUserLoading)
  setLoading(ctx: StateContext<UserStateModel>, action: SetUserLoading): void {
    ctx.patchState({ loading: action.loading });
  }

  @Action(SetUserError)
  setError(ctx: StateContext<UserStateModel>, action: SetUserError): void {
    ctx.patchState({ error: action.error });
  }
}
