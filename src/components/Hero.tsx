import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Leaf, Users, MapPin, Clock } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  setPage: (page: Page) => void;
}

export default function Hero({ setPage }: HeroProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full translate-y-1/3 -translate-x-1/4" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-20 w-16 h-16 bg-emerald-100 rounded-2xl rotate-12 hidden lg:block opacity-60"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-64 left-16 w-12 h-12 bg-teal-100 rounded-xl -rotate-12 hidden lg:block opacity-50"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 right-32 w-10 h-10 bg-emerald-200 rounded-lg rotate-45 hidden lg:block opacity-40"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Smart Rides,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
              AI-powered ride sharing that matches riders and drivers based on routes, schedules, and personal preferences for the most efficient commute.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setPage('find-ride')}
                className="group px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 flex items-center gap-2"
              >
                Find Your Ride
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setPage('how-it-works')}
                className="px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:border-emerald-300 hover:text-emerald-700 transition-all hover:shadow-lg active:scale-95"
              >
                How It Works
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {['👨‍💼', '👩‍💻', '👨‍🎓', '👩‍🔬'].map((a, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-white flex items-center justify-center text-lg">
                      {a}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">500+ active users</span>
              </div>
              <div className="flex items-center gap-1">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-amber-400 text-lg">{s}</span>
                ))}
                <span className="text-sm text-gray-500 font-medium ml-1">4.8/5</span>
              </div>
            </div>
          </motion.div>

          {/* Right visual - Matching Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/60 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Live Matching</h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Active
                </span>
              </div>

              {/* Route visualization */}
              <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl p-5 mb-5">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    <div className="w-0.5 h-12 bg-gradient-to-b from-emerald-500 to-teal-500 my-1" />
                    <div className="w-3 h-3 rounded-full bg-teal-600 ring-4 ring-teal-100" />
                  </div>
                  <div className="flex-1 space-y-8">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">PICKUP</p>
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        Indiranagar, Bangalore
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">DROP-OFF</p>
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        Electronic City, Bangalore
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      9:00 AM
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Results Preview */}
              <div className="space-y-3">
                {[
                  { name: 'Priya P.', score: 96, vehicle: 'Hyundai Creta', price: '₹85', avatar: '👩‍💻' },
                  { name: 'Arjun S.', score: 91, vehicle: 'Maruti Swift', price: '₹65', avatar: '👨‍💼' },
                  { name: 'Sneha R.', score: 87, vehicle: 'Toyota Innova', price: '₹55', avatar: '👩‍🔬' },
                ].map((match, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-xl">
                        {match.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{match.name}</p>
                        <p className="text-xs text-gray-400">{match.vehicle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-700">{match.price}</span>
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        match.score >= 95 ? 'bg-emerald-100 text-emerald-700' :
                        match.score >= 90 ? 'bg-teal-100 text-teal-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {match.score}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Powered by AI matching algorithm • Updated in real-time
                </p>
              </div>
            </div>

            {/* Decorative badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-gray-700">Verified</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-3 -left-3 bg-white rounded-2xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-gray-700">2.5 kg CO₂ saved</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Users, label: 'Active Users', value: '534+', color: 'from-emerald-500 to-emerald-600' },
            { icon: MapPin, label: 'Rides Completed', value: '1,247', color: 'from-teal-500 to-teal-600' },
            { icon: Leaf, label: 'CO₂ Saved (tons)', value: '3.2', color: 'from-cyan-500 to-cyan-600' },
            { icon: Zap, label: 'Match Rate', value: '94%', color: 'from-blue-500 to-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
