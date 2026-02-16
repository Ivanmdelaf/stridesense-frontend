import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserState, ClearUser } from '../../state/user.state';
import { ClearSessions } from '../../state/sessions.state';
import { ClearRisk } from '../../state/risk.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly store  = inject(Store);
  private readonly router = inject(Router);

  user$ = this.store.select(UserState.user);

  logout(): void {
    this.store.dispatch([new ClearUser(), new ClearSessions(), new ClearRisk()]);
    this.router.navigate(['/auth/login']);
  }
}
