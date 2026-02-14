import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentials, AuthToken, User } from '../../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../../repositories/user.repository';

export interface LoginResult {
  token: AuthToken;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  execute(_credentials: AuthCredentials): Observable<User> {
    // La autenticación real se delega al datasource via repositorio.
    // El use-case orquesta: llamar al repo y devolver el perfil del usuario.
    return this.userRepository.getProfile();
  }
}
