import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(private readonly tokenStorage: TokenStorageService) {}

  execute(): void {
    this.tokenStorage.clear();
  }
}
