import { motion } from 'framer-motion';
import {
  MapPin, Brain, Users, CheckCircle, Shield, Zap,
  Route, Clock, Leaf, Star, ArrowRight, Sparkles,
  Database, GitBranch, BarChart3
} from 'lucide-react';
import { Page } from '../types';

interface HowItWorksProps {
  setPage: (page: Page) => void;
}

export default function HowItWorks({ setPage }: HowItWorksProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700 mb-4">
            <Sparkles className="w-4 h-4" />
            Under the Hood
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            How <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">RideMatch AI</span> Works
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Our intelligent matching algorithm considers multiple factors to find you the perfect ride partner
          </p>
        </motion.div>

        {/* Main Steps */}
        <div className="space-y-8 mb-20">
          {[
            {
              num: 1,
              icon: MapPin,
              title: 'Input Your Route & Schedule',
              desc: 'Enter your pickup and drop-off locations, preferred time, and travel date. Our system geocodes your locations for precise route analysis.',
              details: ['Auto-complete location search', 'Flexible time windows', 'Recurring ride schedules'],
              color: 'from-emerald-500 to-emerald-600',
            },
            {
              num: 2,
              icon: Brain,
              title: 'AI Preference Matching',
              desc: 'Set your ride preferences including music, AC, conversation level, and more. Our algorithm weighs these factors for comfort compatibility.',
              details: ['Weighted preference scoring', 'Comfort compatibility index', 'Gender preference support'],
              color: 'from-teal-500 to-teal-600',
            },
            {
              num: 3,
              icon: GitBranch,
              title: 'Multi-Factor Scoring Algorithm',
              desc: 'Our core engine calculates a composite match score using route overlap (45%), time compatibility (30%), and preference alignment (25%).',
              details: ['Route overlap analysis', 'Time window matching', 'Detour minimization'],
              color: 'from-cyan-500 to-cyan-600',
            },
            {
              num: 4,
              icon: CheckCircle,
              title: 'Ranked Match Results',
              desc: 'Get a ranked list of compatible drivers with detailed breakdowns of each matching criterion, estimated costs, and environmental impact.',
              details: ['Score breakdown visualization', 'Cost estimation', 'CO₂ savings calculation'],
              color: 'from-blue-500 to-blue-600',
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="shrink-0">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">STEP {step.num}</span>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.details.map(d => (
                    <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Algorithm Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
            Matching Algorithm Architecture
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Route className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Route Analysis</h4>
              <p className="text-3xl font-extrabold text-emerald-600 mb-2">45%</p>
              <p className="text-sm text-gray-500">Weight in scoring</p>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Origin-destination overlap</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Detour distance calc</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Waypoint optimization</p>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Time Matching</h4>
              <p className="text-3xl font-extrabold text-teal-600 mb-2">30%</p>
              <p className="text-sm text-gray-500">Weight in scoring</p>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />Departure time proximity</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />Flexibility window</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />Recurring schedule match</p>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Preferences</h4>
              <p className="text-3xl font-extrabold text-cyan-600 mb-2">25%</p>
              <p className="text-sm text-gray-500">Weight in scoring</p>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />Comfort preferences</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />Social compatibility</p>
                <p className="text-xs text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />Safety preferences</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Tech Stack & Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Database, label: 'Frontend', tech: 'React + TypeScript', desc: 'Modern UI with type safety', color: 'text-blue-500' },
              { icon: Zap, label: 'Styling', tech: 'Tailwind CSS', desc: 'Utility-first responsive design', color: 'text-cyan-500' },
              { icon: BarChart3, label: 'Algorithm', tech: 'Custom Scoring', desc: 'Multi-factor weighted matching', color: 'text-emerald-500' },
              { icon: Shield, label: 'Features', tech: 'Real-time Match', desc: 'Live matching & notifications', color: 'text-teal-500' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-base font-bold text-gray-900 mt-1">{item.tech}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'Smart Matching', desc: 'AI-driven algorithm for optimal rider-driver pairing' },
              { icon: Shield, title: 'Safety First', desc: 'Verified users, SOS features, and ride tracking' },
              { icon: Leaf, title: 'Eco Friendly', desc: 'Track CO₂ savings and environmental impact' },
              { icon: Star, title: 'Rating System', desc: 'Mutual rating for trust and quality assurance' },
              { icon: Zap, title: 'Real-time', desc: 'Instant matching with live availability updates' },
              { icon: Route, title: 'Route Optimization', desc: 'Minimized detours for efficient commuting' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                  <feature.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-10 text-center text-white shadow-2xl shadow-emerald-500/20"
        >
          <h2 className="text-3xl font-extrabold mb-3">Ready to Try It?</h2>
          <p className="text-emerald-100 mb-6 max-w-md mx-auto">
            Experience intelligent ride matching — find your perfect commute partner in seconds.
          </p>
          <button
            onClick={() => setPage('find-ride')}
            className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
          >
            Try Find Ride
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
