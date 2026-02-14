import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { AuthDatasource } from '../datasources/auth.datasource';

@Injectable({ providedIn: 'root' })
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  getProfile(): Observable<User> {
    return this.datasource.getProfile();
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.datasource.updateProfile(data);
  }
}
