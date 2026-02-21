import { Observable } from 'rxjs';
import { Session, CreateSessionPayload, UpdateSessionPayload } from '../entities/session.entity';

export const SESSION_REPOSITORY = 'SESSION_REPOSITORY';

export interface ISessionRepository {
  getAll(): Observable<Session[]>;
  getById(id: string): Observable<Session>;
  create(payload: CreateSessionPayload): Observable<Session>;
  update(id: string, payload: UpdateSessionPayload): Observable<Session>;
  delete(id: string): Observable<void>;
}

// export abstract class SessionRepository {
//   abstract getSessions(userId: number): Promise<Session[]>;
//   abstract createSession(session: Session): Promise<Session>;
// }