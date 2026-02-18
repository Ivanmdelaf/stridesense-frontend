import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import {
  UserState,
  UserStateModel,
  SetUser,
  ClearUser,
  SetUserLoading,
} from './user.state';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';

const mockRepo = {
  login: vi.fn(),
  register: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
};

const mockUser: User = {
  id: '1',
  name: 'Ivan Test',
  email: 'ivan@test.com',
  role: 'athlete',
  avatarUrl: null,
};

describe('UserState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore([UserState]),
        { provide: USER_REPOSITORY, useValue: mockRepo },
      ],
    });
    store = TestBed.inject(Store);
  });

  it('should have null user by default', () => {
    const user = store.selectSnapshot(UserState.user);
    expect(user).toBeNull();
  });

  it('should have loading false by default', () => {
    const loading = store.selectSnapshot(UserState.loading);
    expect(loading).toBe(false);
  });

  it('isLoggedIn should be false when no user', () => {
    expect(store.selectSnapshot(UserState.isLoggedIn)).toBe(false);
  });

  describe('SetUser', () => {
    it('should set the user and clear loading', () => {
      store.dispatch(new SetUserLoading(true));
      store.dispatch(new SetUser(mockUser));

      expect(store.selectSnapshot(UserState.user)).toEqual(mockUser);
      expect(store.selectSnapshot(UserState.loading)).toBe(false);
    });

    it('isLoggedIn should be true after SetUser', () => {
      store.dispatch(new SetUser(mockUser));
      expect(store.selectSnapshot(UserState.isLoggedIn)).toBe(true);
    });
  });

  describe('ClearUser', () => {
    it('should remove user and reset loading', () => {
      store.dispatch(new SetUser(mockUser));
      store.dispatch(new ClearUser());

      expect(store.selectSnapshot(UserState.user)).toBeNull();
      expect(store.selectSnapshot(UserState.loading)).toBe(false);
    });

    it('isLoggedIn should be false after ClearUser', () => {
      store.dispatch(new SetUser(mockUser));
      store.dispatch(new ClearUser());
      expect(store.selectSnapshot(UserState.isLoggedIn)).toBe(false);
    });
  });

  describe('SetUserLoading', () => {
    it('should set loading to true', () => {
      store.dispatch(new SetUserLoading(true));
      expect(store.selectSnapshot(UserState.loading)).toBe(true);
    });

    it('should set loading to false', () => {
      store.dispatch(new SetUserLoading(true));
      store.dispatch(new SetUserLoading(false));
      expect(store.selectSnapshot(UserState.loading)).toBe(false);
    });
  });
});
