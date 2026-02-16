import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddSession } from '../../state/sessions.state';
import { Session, Sport } from '../../../domain/entities/session.entity';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss',
})
export class SessionFormComponent {
  private readonly store  = inject(Store);
  private readonly router = inject(Router);

  sport: Sport = 'running';
  date = new Date().toISOString().split('T')[0];
  durationMinutes = 30;
  distanceKm: number | null = null;
  notes = '';
  error = signal<string | null>(null);

  onSubmit(): void {
    const newSession: Session = {
      id: crypto.randomUUID(),
      sport: this.sport,
      date: this.date,
      durationMinutes: this.durationMinutes,
      distanceKm: this.distanceKm,
      notes: this.notes || null,
    };

    this.store.dispatch(new AddSession(newSession));
    this.router.navigate(['/sessions']);
  }
}
