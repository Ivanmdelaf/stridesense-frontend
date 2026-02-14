export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskFactor {
  id: string;
  label: string;
  score: number;
  level: RiskLevel;
}

export interface RiskSummary {
  overallScore: number;
  overallLevel: RiskLevel;
  factors: RiskFactor[];
  generatedAt: string;
}
