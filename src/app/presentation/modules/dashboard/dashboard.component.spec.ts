import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';
import { DashboardComponent } from './dashboard.component';
import { UserState } from '../../state/user.state';
import { SessionsState, SetSessions } from '../../state/sessions.state';
import { RiskState, SetRisk } from '../../state/risk.state';
import { Session } from '../../../domain/entities/session.entity';
import { RiskSummary } from '../../../domain/entities/risk.entity';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository';
import { SESSION_REPOSITORY } from '../../../domain/repositories/session.repository';
import { RISK_REPOSITORY } from '../../../domain/repositories/risk.repository';

const mockUserRepo = {
  login: vi.fn(),
  register: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
};

const mockSessions: Session[] = [
  { id: 's1', date: '2026-02-15', durationMinutes: 44, sport: 'running', distanceKm: 8.2, avgHeartRate: 158, cadenceSpm: 174, notes: null },
  { id: 's2', date: '2026-02-14', durationMinutes: 60, sport: 'cycling', distanceKm: 25, avgHeartRate: 140, cadenceSpm: 85, notes: null },
  { id: 's3', date: '2026-02-10', durationMinutes: 30, sport: 'running', distanceKm: 5, avgHeartRate: 145, cadenceSpm: 170, notes: null },
];

const mockRisk: RiskSummary = {
  overallScore: 62,
  overallLevel: 'medium',
  factors: [],
  mlPrediction: { score: 55, level: 'medium' },
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
        { provide: USER_REPOSITORY, useValue: mockUserRepo },
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
        { provide: RISK_REPOSITORY, useValue: { getSummary: vi.fn().mockReturnValue(NEVER) } },
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

  it('should render the brand header', () => {
    const brand = fixture.nativeElement.querySelector('.brand-name');
    expect(brand).toBeTruthy();
    expect(brand.textContent.trim()).toBe('StrideSense');
  });

  it('should render the risk card', () => {
    const riskCard = fixture.nativeElement.querySelector('.risk-card');
    expect(riskCard).toBeTruthy();
  });

  it('should show risk level when risk loaded', async () => {
    store.dispatch(new SetRisk(mockRisk));
    fixture.detectChanges();
    await fixture.whenStable();

    const level = fixture.nativeElement.querySelector('.risk-card__level');
    expect(level).toBeTruthy();
    expect(level.textContent.trim()).toBe('Medio');
    expect(level.classList.contains('risk-medium')).toBe(true);
  });

  it('should show risk score percentage', async () => {
    store.dispatch(new SetRisk(mockRisk));
    fixture.detectChanges();
    await fixture.whenStable();

    const score = fixture.nativeElement.querySelector('.risk-card__score');
    expect(score.textContent).toContain('62%');
  });

  it('should render donut chart with correct stroke', async () => {
    store.dispatch(new SetRisk(mockRisk));
    fixture.detectChanges();
    await fixture.whenStable();

    // 2 outer circles (background + progress) + 2 inner ML circles = 4 total
    const circles = fixture.nativeElement.querySelectorAll('.donut circle');
    expect(circles.length).toBe(4);
  });

  it('should show latest session metrics when sessions loaded', async () => {
    store.dispatch(new SetSessions(mockSessions));
    fixture.detectChanges();
    await fixture.whenStable();

    const values = fixture.nativeElement.querySelectorAll('.recent-session .metric-item__value');
    expect(values.length).toBe(3);
    expect(values[0].textContent.trim()).toBe('8.2');
    expect(values[1].textContent.trim()).toBe('44');
    expect(values[2].textContent.trim()).toBe('158');
  });

  it('should render key metrics section', () => {
    const keyMetrics = fixture.nativeElement.querySelector('.key-metrics');
    expect(keyMetrics).toBeTruthy();
  });

  it('should compute latestSession from first session', () => {
    store.dispatch(new SetSessions(mockSessions));
    expect(component.latestSession()?.id).toBe('s1');
  });

  it('should compute avgCadence from sessions with cadence', () => {
    store.dispatch(new SetSessions(mockSessions));
    const avg = component.avgCadence();
    expect(avg).toBe(Math.round((174 + 85 + 170) / 3));
  });

  it('should return null avgCadence when no sessions', () => {
    expect(component.avgCadence()).toBeNull();
  });

  it('should dispatch LoadSessions and LoadRisk on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
