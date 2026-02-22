import { TestBed } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { App } from './app';
import { UserState } from './presentation/state/user.state';
import { SessionsState } from './presentation/state/sessions.state';
import { RiskState } from './presentation/state/risk.state';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { SESSION_REPOSITORY } from './domain/repositories/session.repository';
import { RISK_REPOSITORY } from './domain/repositories/risk.repository';

const mockRepo = {
  login: vi.fn(),
  register: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
};

describe('App (root component)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideStore([UserState, SessionsState, RiskState]),
        { provide: USER_REPOSITORY, useValue: mockRepo },
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have title signal with value stridesense', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance.title()).toBe('stridesense');
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});
