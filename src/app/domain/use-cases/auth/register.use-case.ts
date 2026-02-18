import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { RegisterCredentials, User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly tokenStorage: TokenStorageService
  ) {}

  execute(data: RegisterCredentials): Observable<User> {
    return this.userRepository.register(data).pipe(
      tap((token) => this.tokenStorage.save(token)),
      switchMap(() => this.userRepository.getProfile())
    );
  }
}
