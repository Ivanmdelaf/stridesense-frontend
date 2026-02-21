import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { UpdateSessionUseCase } from './update-session.use-case';
import { SESSION_REPOSITORY } from '../../repositories/session.repository';
import { Session, UpdateSessionPayload } from '../../entities/session.entity';

const SESSION_ID = 'session-xyz-456';

const existingSession: Session = {
  id: SESSION_ID,
  date: '2026-02-10',
  durationMinutes: 30,
  sport: 'running',
  distanceKm: 5,
  avgHeartRate: 150,
  cadenceSpm: 170,
  notes: null,
};

const updatePayload: UpdateSessionPayload = {
  durationMinutes: 45,
  distanceKm: 8,
  avgHeartRate: 160,
};

const updatedSession: Session = { ...existingSession, ...updatePayload };

describe('UpdateSessionUseCase', () => {
  let useCase: UpdateSessionUseCase;
  const mockRepo = {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.update.mockReturnValue(of(updatedSession));
    TestBed.configureTestingModule({
      providers: [UpdateSessionUseCase, { provide: SESSION_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(UpdateSessionUseCase);
  });

  it('should call repository update with the correct id and payload', async () => {
    await firstValueFrom(useCase.execute(SESSION_ID, updatePayload));
    expect(mockRepo.update).toHaveBeenCalledWith(SESSION_ID, updatePayload);
    expect(mockRepo.update).toHaveBeenCalledTimes(1);
  });

  it('should return the updated session from the repository', async () => {
    const result = await firstValueFrom(useCase.execute(SESSION_ID, updatePayload));
    expect(result).toEqual(updatedSession);
    expect(result.durationMinutes).toBe(45);
    expect(result.distanceKm).toBe(8);
  });

  it('should support partial updates (only changed fields)', async () => {
    const partialPayload: UpdateSessionPayload = { notes: 'Interval training' };
    const partialResult: Session = { ...existingSession, notes: 'Interval training' };
    mockRepo.update.mockReturnValue(of(partialResult));

    const result = await firstValueFrom(useCase.execute(SESSION_ID, partialPayload));
    expect(mockRepo.update).toHaveBeenCalledWith(SESSION_ID, partialPayload);
    expect(result.notes).toBe('Interval training');
  });

  it('should propagate repository errors', async () => {
    mockRepo.update.mockReturnValue(throwError(() => new Error('Session not found')));
    await expect(firstValueFrom(useCase.execute(SESSION_ID, updatePayload))).rejects.toThrow('Session not found');
  });

  it('should not call any other repository method', async () => {
    await firstValueFrom(useCase.execute(SESSION_ID, updatePayload));
    expect(mockRepo.getAll).not.toHaveBeenCalled();
    expect(mockRepo.create).not.toHaveBeenCalled();
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
