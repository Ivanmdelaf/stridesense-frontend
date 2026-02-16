import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SessionsState, LoadSessions, SelectSession } from '../../state/sessions.state';
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

  sessions$ = this.store.select(SessionsState.sessions);
  loading$  = this.store.select(SessionsState.loading);
  error$    = this.store.select(SessionsState.error);

  ngOnInit(): void {
    this.store.dispatch(new LoadSessions());
  }

  select(session: Session): void {
    this.store.dispatch(new SelectSession(session.id));
  }
}
