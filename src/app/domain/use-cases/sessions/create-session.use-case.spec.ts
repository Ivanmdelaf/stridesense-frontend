import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { CreateSessionUseCase } from './create-session.use-case';
import { SESSION_REPOSITORY } from '../../repositories/session.repository';
import { Session, CreateSessionPayload } from '../../entities/session.entity';

const payload: CreateSessionPayload = { date: '2026-02-15', durationMinutes: 45, sport: 'swimming', distanceKm: 2 };
const createdSession: Session = { id: 'new-1', date: payload.date, durationMinutes: payload.durationMinutes, sport: payload.sport, distanceKm: payload.distanceKm ?? null, avgHeartRate: null, cadenceSpm: null, notes: null };

describe('CreateSessionUseCase', () => {
  let useCase: CreateSessionUseCase;
  const mockRepo = { getAll: vi.fn(), getById: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.create.mockReturnValue(of(createdSession));
    TestBed.configureTestingModule({
      providers: [CreateSessionUseCase, { provide: SESSION_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(CreateSessionUseCase);
  });

  it('should call repository create with payload', async () => {
    await firstValueFrom(useCase.execute(payload));
    expect(mockRepo.create).toHaveBeenCalledWith(payload);
  });

  it('should return the created session', async () => {
    const session = await firstValueFrom(useCase.execute(payload));
    expect(session).toEqual(createdSession);
  });
});
