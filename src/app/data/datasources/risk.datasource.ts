import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskSummary } from '../../domain/entities/risk.entity';

@Injectable({ providedIn: 'root' })
export class RiskDatasource {
  private readonly base = '/api/risk';

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<RiskSummary> {
    return this.http.get<RiskSummary>(`${this.base}/summary`);
  }
}
