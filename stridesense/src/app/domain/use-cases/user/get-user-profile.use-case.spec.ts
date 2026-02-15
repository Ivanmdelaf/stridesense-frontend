import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { GetUserProfileUseCase } from './get-user-profile.use-case';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

const mockUser: User = { id: '42', name: 'Maria Coach', email: 'maria@stridesense.com', role: 'coach', avatarUrl: null };

describe('GetUserProfileUseCase', () => {
  let useCase: GetUserProfileUseCase;
  const mockRepo = { getProfile: vi.fn(), updateProfile: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.getProfile.mockReturnValue(of(mockUser));
    TestBed.configureTestingModule({
      providers: [GetUserProfileUseCase, { provide: USER_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(GetUserProfileUseCase);
  });

  it('should call repository getProfile', async () => {
    await firstValueFrom(useCase.execute());
    expect(mockRepo.getProfile).toHaveBeenCalledTimes(1);
  });

  it('should return the user profile', async () => {
    const user = await firstValueFrom(useCase.execute());
    expect(user).toEqual(mockUser);
    expect(user.role).toBe('coach');
  });
});
