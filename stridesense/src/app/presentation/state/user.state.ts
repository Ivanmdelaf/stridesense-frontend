import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { User } from '../../domain/entities/user.entity';

// --- State model ---
export interface UserStateModel {
  user: User | null;
  loading: boolean;
}

// --- Actions ---
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

// --- State ---
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    loading: false,
  },
})
@Injectable()
export class UserState {
  @Selector()
  static user(state: UserStateModel): User | null {
    return state.user;
  }

  @Selector()
  static loading(state: UserStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return state.user !== null;
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
}
