import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session, CreateSessionPayload } from '../../entities/session.entity';
import { ISessionRepository, SESSION_REPOSITORY } from '../../repositories/session.repository';

@Injectable({ providedIn: 'root' })
export class CreateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository
  ) {}

  execute(payload: CreateSessionPayload): Observable<Session> {
    return this.sessionRepository.create(payload);
  }
}
