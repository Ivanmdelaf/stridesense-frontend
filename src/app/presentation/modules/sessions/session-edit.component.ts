import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { SessionsState, SelectSession, UpdateSession } from '../../state/sessions.state';
import { Sport } from '../../../domain/entities/session.entity';

@Component({
  selector: 'app-session-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './session-edit.component.html',
  styleUrl: './session-edit.component.scss',
})
export class SessionEditComponent implements OnInit {
  private readonly store  = inject(Store);
  private readonly router = inject(Router);
  private readonly route  = inject(ActivatedRoute);

  sessionId = '';
  sport: Sport = 'running';
  date = '';
  durationMinutes = 30;
  distanceKm: number | null = null;
  avgHeartRate: number | null = null;
  cadenceSpm: number | null = null;
  notes = '';
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.sessionId = id;
    this.store.dispatch(new SelectSession(id));

    const session = this.store.selectSnapshot(SessionsState.selectedSession);
    if (session) {
      this.sport           = session.sport;
      this.date            = typeof session.date === 'string'
        ? session.date.substring(0, 10)
        : new Date(session.date).toISOString().substring(0, 10);
      this.durationMinutes = session.durationMinutes;
      this.distanceKm      = session.distanceKm;
      this.avgHeartRate    = session.avgHeartRate;
      this.cadenceSpm      = session.cadenceSpm;
      this.notes           = session.notes ?? '';
    }
  }

  onSubmit(): void {
    this.store.dispatch(new UpdateSession(this.sessionId, {
      sport:           this.sport,
      date:            this.date,
      durationMinutes: this.durationMinutes,
      distanceKm:      this.distanceKm  ?? undefined,
      avgHeartRate:    this.avgHeartRate ?? undefined,
      cadenceSpm:      this.cadenceSpm  ?? undefined,
      notes:           this.notes || undefined,
    }));
    this.router.navigate(['/sessions']);
  }
}
