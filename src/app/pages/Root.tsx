import { Outlet, useLocation } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useEffect } from 'react';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route changes (but not for hash changes)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}