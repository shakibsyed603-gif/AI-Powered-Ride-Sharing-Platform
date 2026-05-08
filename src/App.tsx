import { useState, useEffect } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FindRide from './components/FindRide';
import Dashboard from './components/Dashboard';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={page} setPage={setPage} />
      
      {page === 'home' && <Hero setPage={setPage} />}
      {page === 'find-ride' && <FindRide />}
      {page === 'dashboard' && <Dashboard />}
      {page === 'how-it-works' && <HowItWorks setPage={setPage} />}
      
      <Footer />
    </div>
  );
}
