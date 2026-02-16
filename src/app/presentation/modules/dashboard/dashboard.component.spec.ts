import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';
import { DashboardComponent } from './dashboard.component';
import { UserState, SetUser } from '../../state/user.state';
import { SessionsState, SetSessions } from '../../state/sessions.state';
import { RiskState, SetRisk } from '../../state/risk.state';
import { User } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';
import { RiskSummary } from '../../../domain/entities/risk.entity';

const mockUser: User = { id: '1', name: 'Ivan', email: 'i@t.com', role: 'athlete', avatarUrl: null };

const mockSessions: Session[] = [
  { id: 's1', date: '2026-02-15', durationMinutes: 30, sport: 'running', distanceKm: 5, notes: null },
  { id: 's2', date: '2026-02-14', durationMinutes: 45, sport: 'cycling', distanceKm: 15, notes: null },
];

const mockRisk: RiskSummary = {
  overallScore: 40,
  overallLevel: 'low',
  factors: [],
  generatedAt: '2026-02-15T10:00:00Z',
};

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideStore([UserState, SessionsState, RiskState]),
        provideRouter([]),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default greeting when no user', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Atleta');
  });

  it('should show user name when user is set', async () => {
    store.dispatch(new SetUser(mockUser));
    fixture.detectChanges();
    await fixture.whenStable();

    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Ivan');
  });

  it('should show session count when sessions loaded', async () => {
    store.dispatch(new SetSessions(mockSessions));
    fixture.detectChanges();
    await fixture.whenStable();

    const stat = fixture.nativeElement.querySelector('.stat');
    expect(stat.textContent.trim()).toBe('2');
  });

  it('should show risk level when risk loaded', async () => {
    store.dispatch(new SetRisk(mockRisk));
    fixture.detectChanges();
    await fixture.whenStable();

    const riskEl = fixture.nativeElement.querySelector('.risk-low');
    expect(riskEl).toBeTruthy();
  });

  it('should dispatch LoadSessions and LoadRisk on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
