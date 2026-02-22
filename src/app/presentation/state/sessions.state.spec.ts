import { TestBed } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';
import { provideStore, Store } from '@ngxs/store';
import {
  SessionsState,
  LoadSessions,
  SetSessions,
  AddSession,
  SelectSession,
  ClearSessions,
  SetSessionsError,
} from './sessions.state';
import { Session, CreateSessionPayload } from '../../domain/entities/session.entity';
import { SESSION_REPOSITORY } from '../../domain/repositories/session.repository';

const mockSession: Session = {
  id: 'session-1',
  date: '2026-02-15',
  durationMinutes: 45,
  sport: 'running',
  distanceKm: 10,
  avgHeartRate: null,
  cadenceSpm: null,
  notes: 'Test session',
};

const mockSession2: Session = {
  id: 'session-2',
  date: '2026-02-14',
  durationMinutes: 60,
  sport: 'cycling',
  distanceKm: 25,
  avgHeartRate: null,
  cadenceSpm: null,
  notes: null,
};

// Payloads used to dispatch AddSession (CreateSessionPayload uses undefined, not null)
const mockPayload: CreateSessionPayload = {
  date: '2026-02-15',
  durationMinutes: 45,
  sport: 'running',
  distanceKm: 10,
};

const mockPayload2: CreateSessionPayload = {
  date: '2026-02-14',
  durationMinutes: 60,
  sport: 'cycling',
  distanceKm: 25,
};

describe('SessionsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore([SessionsState]),
        {
          provide: SESSION_REPOSITORY,
          useValue: {
            getAll: vi.fn().mockReturnValue(NEVER),
            getById: vi.fn().mockReturnValue(NEVER),
            // create always returns mockSession2 so the AddSession tests are deterministic
            create: vi.fn().mockReturnValue(of(mockSession2)),
            update: vi.fn().mockReturnValue(NEVER),
            delete: vi.fn().mockReturnValue(NEVER),
          },
        },
      ],
    });
    store = TestBed.inject(Store);
  });

  it('should have empty sessions by default', () => {
    expect(store.selectSnapshot(SessionsState.sessions)).toEqual([]);
  });

  it('should have loading false by default', () => {
    expect(store.selectSnapshot(SessionsState.loading)).toBe(false);
  });

  it('should have null selectedSession by default', () => {
    expect(store.selectSnapshot(SessionsState.selectedSession)).toBeNull();
  });

  it('should have null error by default', () => {
    expect(store.selectSnapshot(SessionsState.error)).toBeNull();
  });

  describe('LoadSessions', () => {
    it('should set loading to true and clear error', () => {
      store.dispatch(new SetSessionsError('previous error'));
      store.dispatch(new LoadSessions());

      expect(store.selectSnapshot(SessionsState.loading)).toBe(true);
      expect(store.selectSnapshot(SessionsState.error)).toBeNull();
    });
  });

  describe('SetSessions', () => {
    it('should replace sessions and set loading false', () => {
      store.dispatch(new LoadSessions());
      store.dispatch(new SetSessions([mockSession, mockSession2]));

      const sessions = store.selectSnapshot(SessionsState.sessions);
      expect(sessions).toHaveLength(2);
      expect(sessions[0]).toEqual(mockSession);
      expect(store.selectSnapshot(SessionsState.loading)).toBe(false);
    });

    it('should replace existing sessions', () => {
      store.dispatch(new SetSessions([mockSession]));
      store.dispatch(new SetSessions([mockSession2]));

      const sessions = store.selectSnapshot(SessionsState.sessions);
      expect(sessions).toHaveLength(1);
      expect(sessions[0].id).toBe('session-2');
    });
  });

  describe('AddSession', () => {
    it('should append session to list', () => {
      store.dispatch(new SetSessions([mockSession]));
      store.dispatch(new AddSession(mockPayload2));

      const sessions = store.selectSnapshot(SessionsState.sessions);
      expect(sessions).toHaveLength(2);
      expect(sessions[1]).toEqual(mockSession2);
    });

    it('should add to empty list', () => {
      store.dispatch(new AddSession(mockPayload));
      expect(store.selectSnapshot(SessionsState.sessions)).toHaveLength(1);
    });
  });

  describe('SelectSession', () => {
    it('should set selectedSession by id', () => {
      store.dispatch(new SetSessions([mockSession, mockSession2]));
      store.dispatch(new SelectSession('session-2'));

      expect(store.selectSnapshot(SessionsState.selectedSession)).toEqual(mockSession2);
    });

    it('should set null if id not found', () => {
      store.dispatch(new SetSessions([mockSession]));
      store.dispatch(new SelectSession('nonexistent'));

      expect(store.selectSnapshot(SessionsState.selectedSession)).toBeNull();
    });
  });

  describe('ClearSessions', () => {
    it('should reset all state', () => {
      store.dispatch(new SetSessions([mockSession]));
      store.dispatch(new SelectSession('session-1'));
      store.dispatch(new ClearSessions());

      expect(store.selectSnapshot(SessionsState.sessions)).toEqual([]);
      expect(store.selectSnapshot(SessionsState.selectedSession)).toBeNull();
      expect(store.selectSnapshot(SessionsState.error)).toBeNull();
    });
  });

  describe('SetSessionsError', () => {
    it('should set error and stop loading', () => {
      store.dispatch(new LoadSessions());
      store.dispatch(new SetSessionsError('Network error'));

      expect(store.selectSnapshot(SessionsState.error)).toBe('Network error');
      expect(store.selectSnapshot(SessionsState.loading)).toBe(false);
    });
  });
});
