import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { DeleteSessionUseCase } from './delete-session.use-case';
import { SESSION_REPOSITORY } from '../../repositories/session.repository';

const SESSION_ID = 'session-abc-123';

describe('DeleteSessionUseCase', () => {
  let useCase: DeleteSessionUseCase;
  const mockRepo = {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [DeleteSessionUseCase, { provide: SESSION_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(DeleteSessionUseCase);
  });

  it('should call repository delete with the given id', async () => {
    mockRepo.delete.mockReturnValue(of(undefined));
    await firstValueFrom(useCase.execute(SESSION_ID));
    expect(mockRepo.delete).toHaveBeenCalledWith(SESSION_ID);
    expect(mockRepo.delete).toHaveBeenCalledTimes(1);
  });

  it('should complete without emitting a value on success', async () => {
    mockRepo.delete.mockReturnValue(of(undefined));
    const result = await firstValueFrom(useCase.execute(SESSION_ID));
    expect(result).toBeUndefined();
  });

  it('should propagate repository errors', async () => {
    mockRepo.delete.mockReturnValue(throwError(() => new Error('Not found')));
    await expect(firstValueFrom(useCase.execute(SESSION_ID))).rejects.toThrow('Not found');
  });

  it('should not call any other repository method', async () => {
    mockRepo.delete.mockReturnValue(of(undefined));
    await firstValueFrom(useCase.execute(SESSION_ID));
    expect(mockRepo.getAll).not.toHaveBeenCalled();
    expect(mockRepo.create).not.toHaveBeenCalled();
    expect(mockRepo.update).not.toHaveBeenCalled();
  });
});
