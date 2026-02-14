import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  execute(): void {
    // Limpiar tokens y sesión local
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
