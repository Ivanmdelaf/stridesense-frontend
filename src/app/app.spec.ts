import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { App } from './app';
import { UserState } from './presentation/state/user.state';
import { SessionsState } from './presentation/state/sessions.state';
import { RiskState } from './presentation/state/risk.state';

describe('App (root component)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideStore([UserState, SessionsState, RiskState]),
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
