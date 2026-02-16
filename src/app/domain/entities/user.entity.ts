export type RoleType = 'athlete' | 'coach' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatarUrl: string | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
