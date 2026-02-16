import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login, UserState } from '../../state/user.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = this.store.selectSignal(UserState.loading);
  error = this.store.selectSignal(UserState.error);

  onSubmit(): void {
    this.store.dispatch(new Login({ email: this.email, password: this.password }))
      .subscribe(() => {
        const isLoggedIn = this.store.selectSnapshot(UserState.isLoggedIn);
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
