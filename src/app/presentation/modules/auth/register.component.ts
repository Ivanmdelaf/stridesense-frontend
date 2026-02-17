import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Register, UserState } from '../../state/user.state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = this.store.selectSignal(UserState.loading);
  error = this.store.selectSignal(UserState.error);

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordMismatch) return;

    this.store.dispatch(new Register({ name: this.name, email: this.email, password: this.password }))
      .subscribe(() => {
        const isLoggedIn = this.store.selectSnapshot(UserState.isLoggedIn);
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
