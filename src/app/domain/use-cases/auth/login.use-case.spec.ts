import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { LoginUseCase } from './login.use-case';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

const mockUser: User = { id: '1', name: 'Ivan', email: 'ivan@test.com', role: 'athlete', avatarUrl: null };
const mockToken = { accessToken: 'token', refreshToken: 'refresh', expiresIn: 3600 };

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  const mockRepo = {
    login: vi.fn(),
    register: vi.fn(),
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.login.mockReturnValue(of(mockToken));
    mockRepo.getProfile.mockReturnValue(of(mockUser));
    TestBed.configureTestingModule({
      providers: [LoginUseCase, { provide: USER_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(LoginUseCase);
  });

  it('should call getProfile on repository', async () => {
    await firstValueFrom(useCase.execute({ email: 'ivan@test.com', password: '123456' }));
    expect(mockRepo.getProfile).toHaveBeenCalledTimes(1);
  });

  it('should return the user from repository', async () => {
    const user = await firstValueFrom(useCase.execute({ email: 'ivan@test.com', password: '123456' }));
    expect(user).toEqual(mockUser);
  });
});
