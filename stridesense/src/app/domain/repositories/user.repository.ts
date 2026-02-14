import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  getProfile(): Observable<User>;
  updateProfile(data: Partial<User>): Observable<User>;
}
