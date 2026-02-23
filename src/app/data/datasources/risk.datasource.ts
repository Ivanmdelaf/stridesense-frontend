import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskSummary } from '../../domain/entities/risk.entity';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class RiskDatasource {
  private readonly base = `${environment.apiUrl}/risk`;

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<RiskSummary> {
    return this.http.get<RiskSummary>(`${this.base}/summary`);
  }
}
