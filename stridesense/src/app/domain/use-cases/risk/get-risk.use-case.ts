import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RiskSummary } from '../../entities/risk.entity';
import { IRiskRepository, RISK_REPOSITORY } from '../../repositories/risk.repository';

@Injectable({ providedIn: 'root' })
export class GetRiskUseCase {
  constructor(
    @Inject(RISK_REPOSITORY) private readonly riskRepository: IRiskRepository
  ) {}

  execute(): Observable<RiskSummary> {
    return this.riskRepository.getSummary();
  }
}
