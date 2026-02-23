import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session, CreateSessionPayload, UpdateSessionPayload } from '../../domain/entities/session.entity';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SessionDatasource {
  private readonly base = `${environment.apiUrl}/sessions`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(this.base);
  }

  getById(id: string): Observable<Session> {
    return this.http.get<Session>(`${this.base}/${id}`);
  }

  create(payload: CreateSessionPayload): Observable<Session> {
    return this.http.post<Session>(this.base, payload);
  }

  update(id: string, payload: UpdateSessionPayload): Observable<Session> {
    return this.http.patch<Session>(`${this.base}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
