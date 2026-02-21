import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISessionRepository, SESSION_REPOSITORY } from '../../repositories/session.repository';

@Injectable({ providedIn: 'root' })
export class DeleteSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository
  ) {}

  execute(id: string): Observable<void> {
    return this.sessionRepository.delete(id);
  }
}
