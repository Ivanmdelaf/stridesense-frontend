export type Sport = 'running' | 'cycling' | 'swimming' | 'strength' | 'other';

export interface Session {
  id: string;
  date: string;
  durationMinutes: number;
  sport: Sport;
  distanceKm: number | null;
  notes: string | null;
}

export interface CreateSessionPayload {
  date: string;
  durationMinutes: number;
  sport: Sport;
  distanceKm?: number;
  notes?: string;
}

// export interface Session {
//   id: number;
//   userId: number;
//   distanceKm: number;
//   durationMin: number;
//   avgHeartRate: number;
//   cadence: number;
//   elevationGain: number;
//   rpe: number;
//   sleepHours: number;
//   createdAt: Date;
// }

