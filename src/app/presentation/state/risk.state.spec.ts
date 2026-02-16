import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import {
  RiskState,
  LoadRisk,
  SetRisk,
  ClearRisk,
  SetRiskError,
} from './risk.state';
import { RiskSummary } from '../../domain/entities/risk.entity';

const mockSummary: RiskSummary = {
  overallScore: 72,
  overallLevel: 'medium',
  factors: [
    { id: 'f1', label: 'Carga de entrenamiento', score: 80, level: 'high' },
    { id: 'f2', label: 'Descanso', score: 60, level: 'medium' },
  ],
  generatedAt: '2026-02-15T10:00:00Z',
};

describe('RiskState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([RiskState])],
    });
    store = TestBed.inject(Store);
  });

  it('should have null summary by default', () => {
    expect(store.selectSnapshot(RiskState.summary)).toBeNull();
  });

  it('should have loading false by default', () => {
    expect(store.selectSnapshot(RiskState.loading)).toBe(false);
  });

  it('should have null error by default', () => {
    expect(store.selectSnapshot(RiskState.error)).toBeNull();
  });

  it('overallLevel should be null when no summary', () => {
    expect(store.selectSnapshot(RiskState.overallLevel)).toBeNull();
  });

  describe('LoadRisk', () => {
    it('should set loading true and clear error', () => {
      store.dispatch(new SetRiskError('old error'));
      store.dispatch(new LoadRisk());

      expect(store.selectSnapshot(RiskState.loading)).toBe(true);
      expect(store.selectSnapshot(RiskState.error)).toBeNull();
    });
  });

  describe('SetRisk', () => {
    it('should set summary and stop loading', () => {
      store.dispatch(new LoadRisk());
      store.dispatch(new SetRisk(mockSummary));

      expect(store.selectSnapshot(RiskState.summary)).toEqual(mockSummary);
      expect(store.selectSnapshot(RiskState.loading)).toBe(false);
    });

    it('overallLevel selector should return correct level', () => {
      store.dispatch(new SetRisk(mockSummary));
      expect(store.selectSnapshot(RiskState.overallLevel)).toBe('medium');
    });

    it('should expose factors correctly', () => {
      store.dispatch(new SetRisk(mockSummary));
      const summary = store.selectSnapshot(RiskState.summary);
      expect(summary?.factors).toHaveLength(2);
      expect(summary?.factors[0].level).toBe('high');
    });
  });

  describe('ClearRisk', () => {
    it('should reset summary and error', () => {
      store.dispatch(new SetRisk(mockSummary));
      store.dispatch(new SetRiskError('err'));
      store.dispatch(new ClearRisk());

      expect(store.selectSnapshot(RiskState.summary)).toBeNull();
      expect(store.selectSnapshot(RiskState.error)).toBeNull();
    });
  });

  describe('SetRiskError', () => {
    it('should set error and stop loading', () => {
      store.dispatch(new LoadRisk());
      store.dispatch(new SetRiskError('API timeout'));

      expect(store.selectSnapshot(RiskState.error)).toBe('API timeout');
      expect(store.selectSnapshot(RiskState.loading)).toBe(false);
    });
  });
});
