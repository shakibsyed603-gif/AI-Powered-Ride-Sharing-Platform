import { Driver, RideRequest, MatchResult } from './types';

const avatars = [
  '👨‍💼', '👩‍💻', '👨‍🎓', '👩‍🔬', '👨‍🏫', '👩‍⚕️', '👨‍🔧', '👩‍🎨',
  '🧑‍💼', '👨‍🍳', '👩‍✈️', '🧑‍🎓'
];

export const sampleDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Arjun Sharma',
    avatar: avatars[0],
    vehicle: { model: 'Maruti Swift', color: 'White', plate: 'KA-01-AB-1234', seats: 3, type: 'hatchback' },
    route: { start: { lat: 12.9716, lng: 77.5946, name: 'MG Road, Bangalore' }, end: { lat: 12.9352, lng: 77.6245, name: 'Koramangala, Bangalore' } },
    time: '09:00',
    date: '2025-01-20',
    preferences: { music: true, smoking: false, pets: false, ac: true, conversation: 'moderate', gender: 'any' },
    rating: 4.8,
    trips: 156,
    verified: true,
    pricePerKm: 8,
  },
  {
    id: 'd2',
    name: 'Priya Patel',
    avatar: avatars[1],
    vehicle: { model: 'Hyundai Creta', color: 'Blue', plate: 'KA-01-CD-5678', seats: 4, type: 'suv' },
    route: { start: { lat: 12.9716, lng: 77.5946, name: 'Indiranagar, Bangalore' }, end: { lat: 12.9081, lng: 77.6476, name: 'HSR Layout, Bangalore' } },
    time: '08:30',
    date: '2025-01-20',
    preferences: { music: true, smoking: false, pets: true, ac: true, conversation: 'chatty', gender: 'any' },
    rating: 4.9,
    trips: 203,
    verified: true,
    pricePerKm: 10,
  },
  {
    id: 'd3',
    name: 'Rahul Verma',
    avatar: avatars[2],
    vehicle: { model: 'Honda City', color: 'Silver', plate: 'KA-02-EF-9012', seats: 3, type: 'sedan' },
    route: { start: { lat: 12.9784, lng: 77.6408, name: 'Whitefield, Bangalore' }, end: { lat: 12.9716, lng: 77.5946, name: 'MG Road, Bangalore' } },
    time: '09:15',
    date: '2025-01-20',
    preferences: { music: false, smoking: false, pets: false, ac: true, conversation: 'quiet', gender: 'any' },
    rating: 4.6,
    trips: 89,
    verified: true,
    pricePerKm: 9,
  },
  {
    id: 'd4',
    name: 'Sneha Reddy',
    avatar: avatars[3],
    vehicle: { model: 'Toyota Innova', color: 'Black', plate: 'KA-01-GH-3456', seats: 6, type: 'minivan' },
    route: { start: { lat: 13.0358, lng: 77.5970, name: 'Hebbal, Bangalore' }, end: { lat: 12.9352, lng: 77.6245, name: 'Electronic City, Bangalore' } },
    time: '08:00',
    date: '2025-01-20',
    preferences: { music: true, smoking: false, pets: true, ac: true, conversation: 'moderate', gender: 'female' },
    rating: 4.7,
    trips: 134,
    verified: true,
    pricePerKm: 7,
  },
  {
    id: 'd5',
    name: 'Vikram Singh',
    avatar: avatars[4],
    vehicle: { model: 'Tata Nexon', color: 'Red', plate: 'KA-03-IJ-7890', seats: 4, type: 'suv' },
    route: { start: { lat: 12.9698, lng: 77.7500, name: 'Marathahalli, Bangalore' }, end: { lat: 12.9352, lng: 77.6245, name: 'Koramangala, Bangalore' } },
    time: '09:30',
    date: '2025-01-20',
    preferences: { music: true, smoking: false, pets: false, ac: true, conversation: 'chatty', gender: 'any' },
    rating: 4.5,
    trips: 67,
    verified: false,
    pricePerKm: 8,
  },
  {
    id: 'd6',
    name: 'Ananya Krishnan',
    avatar: avatars[5],
    vehicle: { model: 'Kia Seltos', color: 'Grey', plate: 'KA-01-KL-2345', seats: 4, type: 'suv' },
    route: { start: { lat: 12.9716, lng: 77.5946, name: 'Jayanagar, Bangalore' }, end: { lat: 13.0358, lng: 77.5970, name: 'Hebbal, Bangalore' } },
    time: '08:45',
    date: '2025-01-20',
    preferences: { music: false, smoking: false, pets: false, ac: true, conversation: 'moderate', gender: 'any' },
    rating: 4.9,
    trips: 245,
    verified: true,
    pricePerKm: 11,
  },
];

export const sampleLocations = [
  'MG Road, Bangalore',
  'Koramangala, Bangalore',
  'Indiranagar, Bangalore',
  'Whitefield, Bangalore',
  'Electronic City, Bangalore',
  'HSR Layout, Bangalore',
  'Marathahalli, Bangalore',
  'Jayanagar, Bangalore',
  'Hebbal, Bangalore',
  'BTM Layout, Bangalore',
  'JP Nagar, Bangalore',
  'Malleshwaram, Bangalore',
  'Yelahanka, Bangalore',
  'Bannerghatta Road, Bangalore',
  'Sarjapur Road, Bangalore',
];

export function calculateMatch(request: Partial<RideRequest>, driver: Driver): MatchResult {
  // Route matching (simplified - based on location name similarity)
  const pickupName = request.pickup?.name?.toLowerCase() || '';
  const dropoffName = request.dropoff?.name?.toLowerCase() || '';
  const driverStart = driver.route.start.name.toLowerCase();
  const driverEnd = driver.route.end.name.toLowerCase();

  let routeMatch = 0;
  if (pickupName && (driverStart.includes(pickupName.split(',')[0].trim()) || pickupName.includes(driverStart.split(',')[0].trim()))) {
    routeMatch += 50;
  } else {
    routeMatch += Math.random() * 30 + 20;
  }
  if (dropoffName && (driverEnd.includes(dropoffName.split(',')[0].trim()) || dropoffName.includes(driverEnd.split(',')[0].trim()))) {
    routeMatch += 50;
  } else {
    routeMatch += Math.random() * 30 + 15;
  }
  routeMatch = Math.min(routeMatch, 100);

  // Time matching
  let timeMatch = 100;
  if (request.time && driver.time) {
    const reqMinutes = parseInt(request.time.split(':')[0]) * 60 + parseInt(request.time.split(':')[1]);
    const drvMinutes = parseInt(driver.time.split(':')[0]) * 60 + parseInt(driver.time.split(':')[1]);
    const diff = Math.abs(reqMinutes - drvMinutes);
    timeMatch = Math.max(0, 100 - diff * 2);
  }

  // Preference matching
  let prefScore = 0;
  let prefTotal = 0;
  if (request.preferences) {
    const prefs = request.preferences;
    if (prefs.smoking === driver.preferences.smoking) prefScore += 20;
    prefTotal += 20;
    if (prefs.music === driver.preferences.music) prefScore += 15;
    prefTotal += 15;
    if (prefs.ac === driver.preferences.ac) prefScore += 15;
    prefTotal += 15;
    if (prefs.pets === driver.preferences.pets) prefScore += 10;
    prefTotal += 10;
    if (prefs.conversation === driver.preferences.conversation) prefScore += 20;
    else if (
      (prefs.conversation === 'moderate' && driver.preferences.conversation !== 'quiet') ||
      (driver.preferences.conversation === 'moderate' && prefs.conversation !== 'quiet')
    ) prefScore += 10;
    prefTotal += 20;
    if (prefs.gender === 'any' || driver.preferences.gender === 'any' || prefs.gender === driver.preferences.gender) prefScore += 20;
    prefTotal += 20;
  } else {
    prefScore = 70;
    prefTotal = 100;
  }
  const preferenceMatch = prefTotal > 0 ? (prefScore / prefTotal) * 100 : 70;

  // Overall score (weighted)
  const score = Math.round(routeMatch * 0.45 + timeMatch * 0.30 + preferenceMatch * 0.25);

  // Estimates
  const estimatedPrice = Math.round(driver.pricePerKm * (Math.random() * 10 + 5));
  const detour = Math.round(Math.random() * 5 + 1);
  const estimatedTime = `${Math.round(Math.random() * 20 + 15)} mins`;
  const co2Saved = Math.round(Math.random() * 3 + 1.5);

  return {
    driver,
    score,
    routeMatch: Math.round(routeMatch),
    timeMatch: Math.round(timeMatch),
    preferenceMatch: Math.round(preferenceMatch),
    estimatedPrice,
    estimatedTime,
    detour,
    co2Saved,
  };
}

export const dashboardStats = {
  totalRides: 1247,
  activeUsers: 534,
  co2Saved: 3.2,
  avgRating: 4.7,
  matchRate: 94,
  costSaved: 45,
  ridesThisWeek: [45, 62, 58, 71, 85, 92, 78],
  ridesByTime: [
    { time: '6-8 AM', count: 120 },
    { time: '8-10 AM', count: 340 },
    { time: '10-12 PM', count: 85 },
    { time: '12-2 PM', count: 95 },
    { time: '2-4 PM', count: 110 },
    { time: '4-6 PM', count: 290 },
    { time: '6-8 PM', count: 180 },
    { time: '8-10 PM', count: 70 },
  ],
  topRoutes: [
    { from: 'Whitefield', to: 'MG Road', rides: 145 },
    { from: 'Electronic City', to: 'Koramangala', rides: 132 },
    { from: 'Hebbal', to: 'Indiranagar', rides: 98 },
    { from: 'Marathahalli', to: 'HSR Layout', rides: 87 },
    { from: 'Jayanagar', to: 'Whitefield', rides: 76 },
  ],
  recentMatches: [
    { rider: 'Amit K.', driver: 'Priya P.', score: 96, time: '2 min ago', status: 'confirmed' },
    { rider: 'Neha S.', driver: 'Arjun S.', score: 91, time: '5 min ago', status: 'confirmed' },
    { rider: 'Rohan M.', driver: 'Vikram S.', score: 87, time: '8 min ago', status: 'pending' },
    { rider: 'Kavya R.', driver: 'Sneha R.', score: 94, time: '12 min ago', status: 'confirmed' },
    { rider: 'Dev P.', driver: 'Ananya K.', score: 82, time: '15 min ago', status: 'confirmed' },
    { rider: 'Sara T.', driver: 'Rahul V.', score: 89, time: '20 min ago', status: 'completed' },
  ],
};
