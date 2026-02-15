import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentials, AuthToken, User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { AuthDatasource } from '../datasources/auth.datasource';

@Injectable({ providedIn: 'root' })
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  login(credentials: AuthCredentials): Observable<AuthToken> {
    return this.datasource.login(credentials);
  }

  getProfile(): Observable<User> {
    return this.datasource.getProfile();
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.datasource.updateProfile(data);
  }
}
