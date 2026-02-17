import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { RegisterUseCase } from './register.use-case';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

const mockUser: User = { id: '1', name: 'Test User', email: 'test@test.com', role: 'athlete', avatarUrl: null };
const mockToken = { accessToken: 'token', refreshToken: 'refresh', expiresIn: 3600 };

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  const mockRepo = {
    register: vi.fn(),
    getProfile: vi.fn(),
    login: vi.fn(),
    updateProfile: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.register.mockReturnValue(of(mockToken));
    mockRepo.getProfile.mockReturnValue(of(mockUser));
    TestBed.configureTestingModule({
      providers: [RegisterUseCase, { provide: USER_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(RegisterUseCase);
  });

  it('should call register on repository', async () => {
    const data = { name: 'Test User', email: 'test@test.com', password: '123456' };
    await firstValueFrom(useCase.execute(data));
    expect(mockRepo.register).toHaveBeenCalledWith(data);
  });

  it('should call getProfile after register', async () => {
    await firstValueFrom(useCase.execute({ name: 'Test', email: 'test@test.com', password: '123456' }));
    expect(mockRepo.getProfile).toHaveBeenCalledTimes(1);
  });

  it('should return the user from repository', async () => {
    const user = await firstValueFrom(useCase.execute({ name: 'Test', email: 'test@test.com', password: '123456' }));
    expect(user).toEqual(mockUser);
  });

  it('should store tokens in localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    await firstValueFrom(useCase.execute({ name: 'Test', email: 'test@test.com', password: '123456' }));
    expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'token');
    expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'refresh');
    setItemSpy.mockRestore();
  });
});
