import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { SessionsState, SelectSession } from '../../state/sessions.state';

@Component({
  selector: 'app-session-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './session-detail.component.html',
  styleUrl: './session-detail.component.scss',
})
export class SessionDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  session$ = this.store.select(SessionsState.selectedSession);
  loading$ = this.store.select(SessionsState.loading);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(new SelectSession(id));
    }
  }
}
