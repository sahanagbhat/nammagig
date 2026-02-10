export type UserRole = 'farmer' | 'creator' | 'tourist';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  profileComplete: boolean;
}

export interface FarmerProfile {
  name: string;
  mobile: string;
  email: string;
  farmLocation: string;
  farmType: string;
  activities: string[];
  languages: string[];
  farmPhoto?: File;
  aadhaarPhoto?: File;
}

export interface CreatorProfile {
  name: string;
  mobile: string;
  email: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  skills: string[];
  languages: string[];
  aadhaarPhoto?: File;
}

export interface TouristProfile {
  name: string;
  mobile: string;
  email: string;
  country: string;
  expectations: string;
  durationDays: number;
  preferredDate?: Date;
  activities: string[];
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
