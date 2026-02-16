import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  execute(): Observable<User> {
    return this.userRepository.getProfile();
  }
}
