import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { RiskRepositoryImpl } from './risk.repository.impl';
import { RiskDatasource } from '../datasources/risk.datasource';
import { RiskSummary } from '../../domain/entities/risk.entity';

const mockSummary: RiskSummary = { overallScore: 50, overallLevel: 'medium', factors: [], generatedAt: '2026-02-15T09:00:00Z' };

describe('RiskRepositoryImpl', () => {
  let repo: RiskRepositoryImpl;
  const mockDatasource = { getSummary: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockDatasource.getSummary.mockReturnValue(of(mockSummary));
    TestBed.configureTestingModule({
      providers: [RiskRepositoryImpl, { provide: RiskDatasource, useValue: mockDatasource }],
    });
    repo = TestBed.inject(RiskRepositoryImpl);
  });

  it('getSummary delegates to datasource', async () => {
    await firstValueFrom(repo.getSummary());
    expect(mockDatasource.getSummary).toHaveBeenCalledTimes(1);
  });

  it('returns summary from datasource', async () => {
    const summary = await firstValueFrom(repo.getSummary());
    expect(summary).toEqual(mockSummary);
  });
});
