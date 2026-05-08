export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface RideRequest {
  id: string;
  name: string;
  avatar: string;
  pickup: Location;
  dropoff: Location;
  time: string;
  date: string;
  seats: number;
  preferences: {
    music: boolean;
    smoking: boolean;
    pets: boolean;
    ac: boolean;
    conversation: 'quiet' | 'moderate' | 'chatty';
    gender: 'any' | 'male' | 'female';
  };
  rating: number;
  trips: number;
  verified: boolean;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  vehicle: {
    model: string;
    color: string;
    plate: string;
    seats: number;
    type: 'sedan' | 'suv' | 'hatchback' | 'minivan';
  };
  route: {
    start: Location;
    end: Location;
  };
  time: string;
  date: string;
  preferences: {
    music: boolean;
    smoking: boolean;
    pets: boolean;
    ac: boolean;
    conversation: 'quiet' | 'moderate' | 'chatty';
    gender: 'any' | 'male' | 'female';
  };
  rating: number;
  trips: number;
  verified: boolean;
  pricePerKm: number;
}

export interface MatchResult {
  driver: Driver;
  score: number;
  routeMatch: number;
  timeMatch: number;
  preferenceMatch: number;
  estimatedPrice: number;
  estimatedTime: string;
  detour: number;
  co2Saved: number;
}

export type Page = 'home' | 'find-ride' | 'dashboard' | 'how-it-works';
