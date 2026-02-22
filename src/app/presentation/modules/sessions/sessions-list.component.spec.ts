import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';
import { SessionsListComponent } from './sessions-list.component';
import { SessionsState, SetSessions, SetSessionsError } from '../../state/sessions.state';
import { Session } from '../../../domain/entities/session.entity';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository';

const mockSessions: Session[] = [
  { id: 's1', date: '2026-02-15', durationMinutes: 30, sport: 'running', distanceKm: 5, avgHeartRate: 150, cadenceSpm: 170, notes: null },
  { id: 's2', date: '2026-02-14', durationMinutes: 60, sport: 'cycling', distanceKm: null, avgHeartRate: null, cadenceSpm: null, notes: 'Easy ride' },
];

describe('SessionsListComponent', () => {
  let fixture: ComponentFixture<SessionsListComponent>;
  let component: SessionsListComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsListComponent],
      providers: [
        provideStore([SessionsState]),
        provideRouter([]),
        {
          provide: SESSION_REPOSITORY,
          useValue: {
            getAll: vi.fn().mockReturnValue(NEVER),
            getById: vi.fn().mockReturnValue(NEVER),
            create: vi.fn().mockReturnValue(NEVER),
            update: vi.fn().mockReturnValue(NEVER),
            delete: vi.fn().mockReturnValue(NEVER),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message after sessions loaded with empty list', async () => {
    // Simulate API response: loaded, no results
    store.dispatch(new SetSessions([]));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('No hay sesiones registradas');
  });

  it('should render session items when sessions are loaded', async () => {
    store.dispatch(new SetSessions(mockSessions));
    fixture.detectChanges();
    await fixture.whenStable();
    const items = fixture.nativeElement.querySelectorAll('.session-item');
    expect(items.length).toBe(2);
  });

  it('should show error message when error is set', async () => {
    store.dispatch(new SetSessionsError('Error de red'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.error').textContent).toContain('Error de red');
  });

  it('should dispatch LoadSessions on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('select() should dispatch SelectSession', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.select(mockSessions[0]);
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
