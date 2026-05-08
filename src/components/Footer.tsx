import { Car, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RideMatch AI</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              An intelligent ride sharing matching platform that uses AI to pair riders with the most compatible drivers based on routes, schedules, and preferences.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Find Ride</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Offer Ride</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Project</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Algorithm</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Team</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 RideMatch AI
          </p>
          <p className="text-xs text-gray-500">
            Built with React • TypeScript • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
