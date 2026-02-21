import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session, UpdateSessionPayload } from '../../entities/session.entity';
import { ISessionRepository, SESSION_REPOSITORY } from '../../repositories/session.repository';

@Injectable({ providedIn: 'root' })
export class UpdateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository
  ) {}

  execute(id: string, payload: UpdateSessionPayload): Observable<Session> {
    return this.sessionRepository.update(id, payload);
  }
}
