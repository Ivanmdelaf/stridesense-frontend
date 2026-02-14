import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../entities/session.entity';
import { ISessionRepository, SESSION_REPOSITORY } from '../../repositories/session.repository';

@Injectable({ providedIn: 'root' })
export class GetSessionsUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository
  ) {}

  execute(): Observable<Session[]> {
    return this.sessionRepository.getAll();
  }
}
