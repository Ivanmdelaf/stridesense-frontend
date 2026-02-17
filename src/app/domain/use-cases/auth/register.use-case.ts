import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { RegisterCredentials, User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  execute(data: RegisterCredentials): Observable<User> {
    return this.userRepository.register(data).pipe(
      tap((token) => {
        localStorage.setItem('accessToken', token.accessToken);
        localStorage.setItem('refreshToken', token.refreshToken);
      }),
      switchMap(() => this.userRepository.getProfile())
    );
  }
}
