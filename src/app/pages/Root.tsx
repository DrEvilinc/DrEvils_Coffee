import { Outlet, useLocation } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { HalloweenCountdownBanner } from '../components/HalloweenCountdownBanner';
import { useEffect } from 'react';
import { initAnalytics, trackPageView } from '../lib/analytics';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to top on route changes (but not for hash changes)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-black">
      <HalloweenCountdownBanner />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}