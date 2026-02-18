import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { AuthCredentials, User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly tokenStorage: TokenStorageService
  ) {}

  execute(credentials: AuthCredentials): Observable<User> {
    return this.userRepository.login(credentials).pipe(
      tap((token) => this.tokenStorage.save(token)),
      switchMap(() => this.userRepository.getProfile())
    );
  }
}
