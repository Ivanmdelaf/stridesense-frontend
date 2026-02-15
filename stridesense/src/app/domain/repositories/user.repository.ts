import { Observable } from 'rxjs';
import { AuthCredentials, AuthToken, User } from '../entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  login(credentials: AuthCredentials): Observable<AuthToken>;
  getProfile(): Observable<User>;
  updateProfile(data: Partial<User>): Observable<User>;
}