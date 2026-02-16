import { Observable } from 'rxjs';
import { RiskSummary } from '../entities/risk.entity';

export const RISK_REPOSITORY = 'RISK_REPOSITORY';

export interface IRiskRepository {
  getSummary(): Observable<RiskSummary>;
}

// export abstract class RiskRepository {
//   abstract getRisk(input: any): Promise<RiskPrediction>;
// }