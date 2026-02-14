import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RiskSummary } from '../../domain/entities/risk.entity';
import { IRiskRepository } from '../../domain/repositories/risk.repository';
import { RiskDatasource } from '../datasources/risk.datasource';

@Injectable({ providedIn: 'root' })
export class RiskRepositoryImpl implements IRiskRepository {
  constructor(private readonly datasource: RiskDatasource) {}

  getSummary(): Observable<RiskSummary> {
    return this.datasource.getSummary();
  }
}
