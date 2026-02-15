import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthCredentials, User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  execute(credentials: AuthCredentials): Observable<User> {
    return this.userRepository.login(credentials).pipe(
      tap((token) => {
        localStorage.setItem('accessToken', token.accessToken);
        localStorage.setItem('refreshToken', token.refreshToken);
      }),
      switchMap(() => this.userRepository.getProfile())
    );
  }
}
