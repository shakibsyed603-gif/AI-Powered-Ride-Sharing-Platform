import { motion } from 'framer-motion';
import {
  Users, MapPin, Leaf, Zap, TrendingUp, Clock, Star,
  CheckCircle, AlertCircle, ArrowUpRight, Route
} from 'lucide-react';
import { dashboardStats } from '../data';
import { cn } from '../utils/cn';

export default function Dashboard() {
  const maxCount = Math.max(...dashboardStats.ridesByTime.map(r => r.count));
  const maxWeek = Math.max(...dashboardStats.ridesThisWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Analytics <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="mt-2 text-gray-500 text-lg">Real-time platform metrics & insights</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Active Users', value: dashboardStats.activeUsers, suffix: '', color: 'from-emerald-500 to-emerald-600', change: '+12%' },
            { icon: MapPin, label: 'Total Rides', value: dashboardStats.totalRides.toLocaleString(), suffix: '', color: 'from-teal-500 to-teal-600', change: '+8%' },
            { icon: Leaf, label: 'CO₂ Saved', value: dashboardStats.co2Saved, suffix: ' tons', color: 'from-cyan-500 to-cyan-600', change: '+23%' },
            { icon: Zap, label: 'Match Rate', value: dashboardStats.matchRate, suffix: '%', color: 'from-blue-500 to-blue-600', change: '+2%' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 mt-3">{stat.value}{stat.suffix}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Rides Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Weekly Ride Trends</h3>
                <p className="text-sm text-gray-500">Rides per day this week</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                +15% vs last week
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-48">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(dashboardStats.ridesThisWeek[i] / maxWeek) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn(
                      'w-full rounded-xl min-h-[8px]',
                      i === 5 ? 'bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-gradient-to-t from-emerald-200 to-emerald-100'
                    )}
                  />
                  <span className="text-xs text-gray-400 font-medium mt-2">{day}</span>
                  <span className="text-xs font-bold text-gray-600">{dashboardStats.ridesThisWeek[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Average Rating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Rating</h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none" stroke="url(#gradient)" strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - dashboardStats.avgRating / 5) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <p className="text-3xl font-extrabold text-gray-900">{dashboardStats.avgRating}</p>
                    <p className="text-xs text-gray-400">/ 5.0</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={cn('w-5 h-5', s <= Math.round(dashboardStats.avgRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200')} />
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on {dashboardStats.totalRides} rides</p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cost Savings</span>
                <span className="font-bold text-emerald-600">{dashboardStats.costSaved}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dashboardStats.costSaved}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Rides by Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Rides by Time</h3>
                <p className="text-sm text-gray-500">Peak hours analysis</p>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {dashboardStats.ridesByTime.map((slot, i) => (
                <div key={slot.time} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-16 shrink-0">{slot.time}</span>
                  <div className="flex-1 h-7 bg-gray-50 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(slot.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className={cn(
                        'h-full rounded-lg',
                        slot.count === maxCount ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-emerald-100'
                      )}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">{slot.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Top Routes</h3>
                <p className="text-sm text-gray-500">Most popular corridors</p>
              </div>
              <Route className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {dashboardStats.topRoutes.map((route, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                      i === 0 ? 'bg-emerald-500 text-white' :
                      i === 1 ? 'bg-teal-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    )}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{route.from} → {route.to}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{route.rides} rides</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Matches</h3>
              <p className="text-sm text-gray-500">Latest AI-powered ride matches</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wider">Rider</th>
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wider">Driver</th>
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wider">Match Score</th>
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wider">Time</th>
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardStats.recentMatches.map((match, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-3 text-sm font-medium text-gray-800">{match.rider}</td>
                    <td className="py-3 text-sm text-gray-600">{match.driver}</td>
                    <td className="py-3">
                      <span className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-bold',
                        match.score >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-100 text-teal-700'
                      )}>
                        {match.score}%
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{match.time}</td>
                    <td className="py-3">
                      <span className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium',
                        match.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                        match.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-blue-50 text-blue-700'
                      )}>
                        {match.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> :
                         match.status === 'pending' ? <AlertCircle className="w-3 h-3" /> :
                         <CheckCircle className="w-3 h-3" />}
                        {match.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
