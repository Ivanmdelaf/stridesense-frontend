import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionsState, LoadSessions, SelectSession, DeleteSession } from '../../state/sessions.state';
import { Session } from '../../../domain/entities/session.entity';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.scss',
})
export class SessionsListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  sessions$ = this.store.select(SessionsState.sessions);
  loading$  = this.store.select(SessionsState.loading);
  error$    = this.store.select(SessionsState.error);

  ngOnInit(): void {
    this.store.dispatch(new LoadSessions());
  }

  select(session: Session): void {
    this.store.dispatch(new SelectSession(session.id));
  }

  edit(event: Event, session: Session): void {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(new SelectSession(session.id));
    this.router.navigate(['/sessions', session.id, 'edit']);
  }

  delete(event: Event, session: Session): void {
    event.preventDefault();
    event.stopPropagation();
    const confirmed = window.confirm(`¿Eliminar la sesión de ${session.sport} del ${new Date(session.date).toLocaleDateString('es-ES')}?`);
    if (confirmed) {
      this.store.dispatch(new DeleteSession(session.id));
    }
  }
}
