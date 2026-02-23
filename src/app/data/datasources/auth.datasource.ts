import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCredentials, AuthToken, RegisterCredentials, User } from '../../domain/entities/user.entity';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthDatasource {
  private readonly base = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.base}/login`, credentials);
  }

  register(data: RegisterCredentials): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.base}/register`, data);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.base}/me`);
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.base}/me`, data);
  }
}
