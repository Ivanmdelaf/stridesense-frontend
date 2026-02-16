import { TestBed } from '@angular/core/testing';
import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LogoutUseCase] });
    useCase = TestBed.inject(LogoutUseCase);
    localStorage.setItem('accessToken', 'token-abc');
    localStorage.setItem('refreshToken', 'refresh-xyz');
  });

  afterEach(() => localStorage.clear());

  it('should remove accessToken from localStorage', () => {
    useCase.execute();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should remove refreshToken from localStorage', () => {
    useCase.execute();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});
