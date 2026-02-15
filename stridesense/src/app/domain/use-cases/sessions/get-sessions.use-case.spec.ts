import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { GetSessionsUseCase } from './get-sessions.use-case';
import { SESSION_REPOSITORY } from '../../repositories/session.repository';
import { Session } from '../../entities/session.entity';

const mockSessions: Session[] = [
  { id: '1', date: '2026-02-15', durationMinutes: 30, sport: 'running', distanceKm: 5, notes: null },
  { id: '2', date: '2026-02-14', durationMinutes: 60, sport: 'cycling', distanceKm: 20, notes: 'Good ride' },
];

describe('GetSessionsUseCase', () => {
  let useCase: GetSessionsUseCase;
  const mockRepo = { getAll: vi.fn(), getById: vi.fn(), create: vi.fn(), delete: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.getAll.mockReturnValue(of(mockSessions));
    TestBed.configureTestingModule({
      providers: [GetSessionsUseCase, { provide: SESSION_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(GetSessionsUseCase);
  });

  it('should call repository getAll', async () => {
    await firstValueFrom(useCase.execute());
    expect(mockRepo.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return sessions from repository', async () => {
    const sessions = await firstValueFrom(useCase.execute());
    expect(sessions).toHaveLength(2);
    expect(sessions[0].sport).toBe('running');
  });
});
