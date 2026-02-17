import { Observable } from 'rxjs';
import { AuthCredentials, AuthToken, RegisterCredentials, User } from '../entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  login(credentials: AuthCredentials): Observable<AuthToken>;
  register(data: RegisterCredentials): Observable<AuthToken>;
  getProfile(): Observable<User>;
  updateProfile(data: Partial<User>): Observable<User>;
}