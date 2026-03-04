import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { label: 'Collection', href: '/collection', type: 'route' },
  { label: 'The Lab', href: '#lab', type: 'anchor' },
  { label: 'History', href: '#first-act', type: 'anchor' },
  { label: 'About', href: '/about', type: 'route' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    setMobileMenuOpen(false);
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const sectionId = href.replace('#', '');
    
    if (!isHomePage) {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on home page, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Technical Corner Markers - Desktop Only */}
        <div className="hidden md:block absolute top-8 left-8 text-zinc-400 font-mono text-xs tracking-wider">
          <div>LAB-001</div>
          <div className="mt-1">Charlotte, North Carolina</div>
          <div className="mt-1">35° 11′ 40.9″ N 80° 47′ 20.0″ W</div>
        </div>
        <div className="hidden md:block absolute top-8 right-8 text-zinc-400 font-mono text-xs tracking-wider text-right">
          <div>PRECISION ROASTING</div>
          <div className="mt-1">EST. 2025</div>
        </div>

        <div className={`max-w-7xl mx-auto px-6 py-6 flex items-center justify-between ${
          scrolled ? 'border-b border-zinc-800' : ''
        }`}>
          {/* Logo */}
          <Link to="/" className="text-white font-light tracking-widest text-lg">
            DR. EVIL'S COFFEE LAB
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-zinc-400 hover:text-white text-sm tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={isHomePage ? item.href : '/' + item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="text-zinc-400 hover:text-white text-sm tracking-wide transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={scrollToWaitlist}
              className="bg-white text-black hover:bg-zinc-200 border-white hover:border-zinc-300 font-mono text-xs tracking-widest"
            >
              JOIN WAITLIST
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                item.type === 'route' ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)}
                      className="text-white text-2xl tracking-wide hover:text-zinc-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.label}
                    href={isHomePage ? item.href : '/' + item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-white text-2xl tracking-wide hover:text-zinc-400 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                )
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button
                  size="lg"
                  onClick={scrollToWaitlist}
                  className="bg-white text-black hover:bg-zinc-200 font-mono text-xs tracking-widest px-8"
                >
                  JOIN WAITLIST
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}