import { Observable } from 'rxjs';
import { RiskSummary } from '../entities/risk.entity';

export const RISK_REPOSITORY = 'RISK_REPOSITORY';

export interface IRiskRepository {
  getSummary(): Observable<RiskSummary>;
}
