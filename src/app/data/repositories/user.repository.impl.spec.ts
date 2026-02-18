import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { UserRepositoryImpl } from './user.repository.impl';
import { AuthDatasource } from '../datasources/auth.datasource';
import { User } from '../../domain/entities/user.entity';

const mockUser: User = { id: '1', name: 'Test User', email: 'test@test.com', role: 'athlete', avatarUrl: null };

describe('UserRepositoryImpl', () => {
  let repo: UserRepositoryImpl;
  const mockDatasource = { getProfile: vi.fn(), updateProfile: vi.fn(), login: vi.fn(), register: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [UserRepositoryImpl, { provide: AuthDatasource, useValue: mockDatasource }],
    });
    repo = TestBed.inject(UserRepositoryImpl);
  });

  describe('getProfile', () => {
    it('should delegate to datasource', async () => {
      mockDatasource.getProfile.mockReturnValue(of(mockUser));
      await firstValueFrom(repo.getProfile());
      expect(mockDatasource.getProfile).toHaveBeenCalledTimes(1);
    });

    it('should return user from datasource', async () => {
      mockDatasource.getProfile.mockReturnValue(of(mockUser));
      const user = await firstValueFrom(repo.getProfile());
      expect(user).toEqual(mockUser);
    });
  });

  describe('updateProfile', () => {
    it('should delegate patch to datasource', async () => {
      const patch = { name: 'Updated' };
      mockDatasource.updateProfile.mockReturnValue(of({ ...mockUser, ...patch }));
      const result = await firstValueFrom(repo.updateProfile(patch));
      expect(mockDatasource.updateProfile).toHaveBeenCalledWith(patch);
      expect(result.name).toBe('Updated');
    });
  });
});
