import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SessionRepositoryImpl } from './session.repository.impl';
import { SessionDatasource } from '../datasources/session.datasource';
import { Session, CreateSessionPayload } from '../../domain/entities/session.entity';

const mockSession: Session = {
  id: 's1',
  date: '2026-02-15',
  durationMinutes: 40,
  sport: 'running',
  distanceKm: 8,
  notes: null,
};

const payload: CreateSessionPayload = {
  date: '2026-02-15',
  durationMinutes: 40,
  sport: 'running',
  distanceKm: 8,
};

describe('SessionRepositoryImpl', () => {
  let repo: SessionRepositoryImpl;
  const mockDatasource = {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        SessionRepositoryImpl,
        { provide: SessionDatasource, useValue: mockDatasource },
      ],
    });
    repo = TestBed.inject(SessionRepositoryImpl);
  });

  it('getAll delegates to datasource', () => {
    mockDatasource.getAll.mockReturnValue(of([]));
    repo.getAll().subscribe();
    expect(mockDatasource.getAll).toHaveBeenCalledTimes(1);
  });

  it('getById delegates with correct id', () => {
    mockDatasource.getById.mockReturnValue(of(mockSession));
    repo.getById('s1').subscribe();
    expect(mockDatasource.getById).toHaveBeenCalledWith('s1');
  });

  it('create delegates with payload', () => {
    mockDatasource.create.mockReturnValue(of(mockSession));
    repo.create(payload).subscribe();
    expect(mockDatasource.create).toHaveBeenCalledWith(payload);
  });

  it('delete delegates with correct id', () => {
    mockDatasource.delete.mockReturnValue(of(undefined));
    repo.delete('s1').subscribe();
    expect(mockDatasource.delete).toHaveBeenCalledWith('s1');
  });
});
