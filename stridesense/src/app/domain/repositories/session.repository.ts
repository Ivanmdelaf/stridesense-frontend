import { Observable } from 'rxjs';
import { Session, CreateSessionPayload } from '../entities/session.entity';

export const SESSION_REPOSITORY = 'SESSION_REPOSITORY';

export interface ISessionRepository {
  getAll(): Observable<Session[]>;
  getById(id: string): Observable<Session>;
  create(payload: CreateSessionPayload): Observable<Session>;
  delete(id: string): Observable<void>;
}
