import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session, CreateSessionPayload, UpdateSessionPayload } from '../../domain/entities/session.entity';
import { ISessionRepository } from '../../domain/repositories/session.repository';
import { SessionDatasource } from '../datasources/session.datasource';

@Injectable({ providedIn: 'root' })
export class SessionRepositoryImpl implements ISessionRepository {
  constructor(private readonly datasource: SessionDatasource) {}

  getAll(): Observable<Session[]> {
    return this.datasource.getAll();
  }

  getById(id: string): Observable<Session> {
    return this.datasource.getById(id);
  }

  create(payload: CreateSessionPayload): Observable<Session> {
    return this.datasource.create(payload);
  }

  update(id: string, payload: UpdateSessionPayload): Observable<Session> {
    return this.datasource.update(id, payload);
  }

  delete(id: string): Observable<void> {
    return this.datasource.delete(id);
  }
}
