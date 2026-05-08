import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, Users, Music, Cigarette, Dog, Wind, MessageCircle,
  Search, Star, Car, CheckCircle, Shield, Leaf, Route, ChevronDown,
  ChevronUp, Heart
} from 'lucide-react';
import { sampleLocations, sampleDrivers, calculateMatch } from '../data';
import { MatchResult, RideRequest } from '../types';
import { cn } from '../utils/cn';

export default function FindRide() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState('2025-01-20');
  const [seats, setSeats] = useState(1);
  const [prefs, setPrefs] = useState<{
    music: boolean; smoking: boolean; pets: boolean; ac: boolean;
    conversation: 'quiet' | 'moderate' | 'chatty';
    gender: 'any' | 'male' | 'female';
  }>({
    music: true, smoking: false, pets: false, ac: true,
    conversation: 'moderate', gender: 'any',
  });

  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);

  const filterLocations = (query: string) =>
    sampleLocations.filter(l => l.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  const handleSearch = () => {
    setSearching(true);
    const request: Partial<RideRequest> = {
      pickup: { lat: 0, lng: 0, name: pickup },
      dropoff: { lat: 0, lng: 0, name: dropoff },
      time, date, seats, preferences: prefs,
    };

    setTimeout(() => {
      const results = sampleDrivers
        .map(driver => calculateMatch(request, driver))
        .sort((a, b) => b.score - a.score);
      setMatches(results);
      setSearching(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Find Your <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Perfect Ride</span>
          </h1>
          <p className="mt-3 text-gray-500 text-lg">Our AI matches you with the best available drivers</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {[
            { num: 1, label: 'Route' },
            { num: 2, label: 'Preferences' },
            { num: 3, label: 'Matches' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                  step >= s.num
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-gray-100 text-gray-400'
                )}>
                  {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                </div>
                <span className={cn('text-xs mt-1.5 font-medium', step >= s.num ? 'text-emerald-600' : 'text-gray-400')}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className={cn(
                  'w-16 sm:w-24 h-0.5 mx-2 rounded transition-all duration-300 mb-5',
                  step > s.num ? 'bg-emerald-500' : 'bg-gray-200'
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Route Details */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Route className="w-5 h-5 text-emerald-500" />
                Where are you going?
              </h2>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500" />
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => {
                          setPickup(e.target.value);
                          setPickupSuggestions(e.target.value.length > 0 ? filterLocations(e.target.value) : []);
                        }}
                        placeholder="Enter pickup location"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                      />
                    </div>
                    {pickupSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {pickupSuggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => { setPickup(s); setPickupSuggestions([]); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 text-sm flex items-center gap-2 transition-colors"
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-teal-500" />
                      <input
                        type="text"
                        value={dropoff}
                        onChange={(e) => {
                          setDropoff(e.target.value);
                          setDropoffSuggestions(e.target.value.length > 0 ? filterLocations(e.target.value) : []);
                        }}
                        placeholder="Enter drop-off location"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 outline-none transition-all text-sm"
                      />
                    </div>
                    {dropoffSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {dropoffSuggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => { setDropoff(s); setDropoffSuggestions([]); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-teal-50 text-sm flex items-center gap-2 transition-colors"
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Seats</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <select
                        value={seats}
                        onChange={(e) => setSeats(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm appearance-none bg-white"
                      >
                        {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} seat{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!pickup || !dropoff}
                  className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  Next: Preferences →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-500" />
                Set Your Preferences
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'music', icon: Music, label: 'Music', desc: 'Allow music during ride' },
                  { key: 'ac', icon: Wind, label: 'AC', desc: 'Air conditioning preferred' },
                  { key: 'smoking', icon: Cigarette, label: 'Smoking', desc: 'Smoking allowed' },
                  { key: 'pets', icon: Dog, label: 'Pets', desc: 'Pets allowed in vehicle' },
                ].map(({ key, icon: Icon, label, desc }) => (
                  <button
                    key={key}
                    onClick={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
                      prefs[key as keyof typeof prefs]
                        ? 'border-emerald-300 bg-emerald-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      prefs[key as keyof typeof prefs] ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                    <div className={cn(
                      'ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      prefs[key as keyof typeof prefs] ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    )}>
                      {prefs[key as keyof typeof prefs] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    Conversation Level
                  </label>
                  <div className="flex gap-2">
                    {(['quiet', 'moderate', 'chatty'] as const).map(level => (
                      <button
                        key={level}
                        onClick={() => setPrefs(p => ({ ...p, conversation: level }))}
                        className={cn(
                          'flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all border-2',
                          prefs.conversation === level
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender Preference</label>
                  <div className="flex gap-2">
                    {(['any', 'male', 'female'] as const).map(g => (
                      <button
                        key={g}
                        onClick={() => setPrefs(p => ({ ...p, gender: g }))}
                        className={cn(
                          'flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all border-2',
                          prefs.gender === g
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Find Matches
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {searching ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-12 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 mx-auto mb-4 border-4 border-emerald-200 border-t-emerald-500 rounded-full"
                  />
                  <h3 className="text-lg font-bold text-gray-900">Finding your perfect match...</h3>
                  <p className="text-gray-500 mt-2 text-sm">Analyzing routes, schedules & preferences</p>
                  <div className="mt-6 max-w-xs mx-auto space-y-2">
                    {['Scanning available drivers...', 'Calculating route overlap...', 'Matching preferences...'].map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex items-center gap-2 text-xs text-gray-500"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {t}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{matches.length} Matches Found</h2>
                      <p className="text-sm text-gray-500">{pickup} → {dropoff}</p>
                    </div>
                    <button
                      onClick={() => { setStep(1); setMatches([]); setSelectedMatch(null); }}
                      className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all"
                    >
                      New Search
                    </button>
                  </div>

                  <div className="space-y-4">
                    {matches.map((match, i) => (
                      <motion.div
                        key={match.driver.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          'bg-white rounded-2xl border-2 overflow-hidden transition-all',
                          selectedMatch === match.driver.id
                            ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                            : 'border-gray-100 shadow-md shadow-gray-100/50 hover:border-emerald-200'
                        )}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-2xl">
                                  {match.driver.avatar}
                                </div>
                                {match.driver.verified && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{match.driver.name}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    {match.driver.rating}
                                  </span>
                                  <span className="text-xs text-gray-400">{match.driver.trips} trips</span>
                                  <span className="flex items-center gap-1 text-xs text-gray-500">
                                    <Car className="w-3.5 h-3.5" />
                                    {match.driver.vehicle.model}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={cn(
                                'inline-flex items-center px-3 py-1.5 rounded-xl text-lg font-extrabold',
                                match.score >= 90 ? 'bg-emerald-100 text-emerald-700' :
                                match.score >= 75 ? 'bg-teal-100 text-teal-700' :
                                match.score >= 60 ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-600'
                              )}>
                                {match.score}%
                              </div>
                              <p className="text-xs text-gray-400 mt-1">match score</p>
                            </div>
                          </div>

                          {/* Quick stats */}
                          <div className="grid grid-cols-4 gap-3 mt-4">
                            {[
                              { label: 'Price', value: `₹${match.estimatedPrice}`, icon: '💰' },
                              { label: 'ETA', value: match.estimatedTime, icon: '⏱️' },
                              { label: 'Detour', value: `${match.detour} km`, icon: '🔄' },
                              { label: 'CO₂ Saved', value: `${match.co2Saved} kg`, icon: '🌿' },
                            ].map(s => (
                              <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                                <p className="text-lg mb-0.5">{s.icon}</p>
                                <p className="text-sm font-bold text-gray-800">{s.value}</p>
                                <p className="text-xs text-gray-400">{s.label}</p>
                              </div>
                            ))}
                          </div>

                          {/* Match breakdown bars */}
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            {[
                              { label: 'Route', value: match.routeMatch, color: 'bg-emerald-500' },
                              { label: 'Time', value: match.timeMatch, color: 'bg-teal-500' },
                              { label: 'Prefs', value: match.preferenceMatch, color: 'bg-cyan-500' },
                            ].map(bar => (
                              <div key={bar.label}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-gray-500">{bar.label}</span>
                                  <span className="text-xs font-bold text-gray-700">{bar.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${bar.value}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                                    className={`h-full rounded-full ${bar.color}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <button
                              onClick={() => setExpandedMatch(expandedMatch === match.driver.id ? null : match.driver.id)}
                              className="text-sm text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
                            >
                              {expandedMatch === match.driver.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              {expandedMatch === match.driver.id ? 'Less Details' : 'More Details'}
                            </button>
                            <button
                              onClick={() => setSelectedMatch(match.driver.id)}
                              className={cn(
                                'px-6 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95',
                                selectedMatch === match.driver.id
                                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              )}
                            >
                              {selectedMatch === match.driver.id ? '✓ Selected' : 'Select Ride'}
                            </button>
                          </div>
                        </div>

                        {/* Expanded details */}
                        <AnimatePresence>
                          {expandedMatch === match.driver.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-gray-100 overflow-hidden"
                            >
                              <div className="p-5 bg-gray-50/50">
                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Vehicle Details</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                      <p>🚗 {match.driver.vehicle.model} ({match.driver.vehicle.color})</p>
                                      <p>🔢 {match.driver.vehicle.plate}</p>
                                      <p>💺 {match.driver.vehicle.seats} seats available</p>
                                      <p>🏷️ {match.driver.vehicle.type}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Driver Preferences</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {match.driver.preferences.music && <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg font-medium">🎵 Music</span>}
                                      {match.driver.preferences.ac && <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">❄️ AC</span>}
                                      {match.driver.preferences.pets && <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs rounded-lg font-medium">🐕 Pets OK</span>}
                                      {!match.driver.preferences.smoking && <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-lg font-medium">🚭 No Smoking</span>}
                                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg font-medium capitalize">💬 {match.driver.preferences.conversation}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <h4 className="text-sm font-bold text-gray-700 mb-2">Route</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Leaf className="w-4 h-4 text-emerald-500" />
                                    <span>{match.driver.route.start.name}</span>
                                    <span className="text-gray-300">→</span>
                                    <span>{match.driver.route.end.name}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {selectedMatch && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center"
                    >
                      <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                      <h3 className="text-xl font-bold">Ride Selected!</h3>
                      <p className="text-emerald-100 mt-1">Your ride request has been sent to the driver. You'll be notified once confirmed.</p>
                      <button
                        onClick={() => { setStep(1); setMatches([]); setSelectedMatch(null); setPickup(''); setDropoff(''); }}
                        className="mt-4 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all active:scale-95"
                      >
                        Book Another Ride
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
