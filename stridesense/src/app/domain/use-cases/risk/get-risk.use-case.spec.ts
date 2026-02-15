import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { GetRiskUseCase } from './get-risk.use-case';
import { RISK_REPOSITORY } from '../../repositories/risk.repository';
import { RiskSummary } from '../../entities/risk.entity';

const mockSummary: RiskSummary = {
  overallScore: 85, overallLevel: 'high',
  factors: [{ id: 'f1', label: 'Fatiga', score: 90, level: 'high' }],
  generatedAt: '2026-02-15T08:00:00Z',
};

describe('GetRiskUseCase', () => {
  let useCase: GetRiskUseCase;
  const mockRepo = { getSummary: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo.getSummary.mockReturnValue(of(mockSummary));
    TestBed.configureTestingModule({
      providers: [GetRiskUseCase, { provide: RISK_REPOSITORY, useValue: mockRepo }],
    });
    useCase = TestBed.inject(GetRiskUseCase);
  });

  it('should call repository getSummary', async () => {
    await firstValueFrom(useCase.execute());
    expect(mockRepo.getSummary).toHaveBeenCalledTimes(1);
  });

  it('should return the risk summary', async () => {
    const summary = await firstValueFrom(useCase.execute());
    expect(summary.overallLevel).toBe('high');
    expect(summary.overallScore).toBe(85);
    expect(summary.factors).toHaveLength(1);
  });
});
