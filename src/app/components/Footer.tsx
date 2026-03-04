import { FlaskConical, Instagram, Youtube, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
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

  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-white text-2xl font-light tracking-wider">DR. EVIL'S</h3>
                <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Coffee Lab</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Precision Coffee, Roasted With Intent.
            </p>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-sm mt-2">
              Born From A Legacy Of Craftsmanship, Fabrication, And Performance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-mono tracking-wider mb-4">NAVIGATE</h4>
            <ul className="space-y-2">
              <li><Link to="/collection" className="text-zinc-500 hover:text-white text-sm transition-colors">Collection</Link></li>
              <li><a href="#lab" className="text-zinc-500 hover:text-white text-sm transition-colors" onClick={(e) => handleAnchorClick(e, '#lab')}>The Lab</a></li>
              <li><a href="#first-act" className="text-zinc-500 hover:text-white text-sm transition-colors" onClick={(e) => handleAnchorClick(e, '#first-act')}>History</a></li>
              <li><Link to="/about" className="text-zinc-500 hover:text-white text-sm transition-colors">About</Link></li>
              <li><a href="#waitlist" className="text-zinc-500 hover:text-white text-sm transition-colors" onClick={(e) => handleAnchorClick(e, '#waitlist')}>Waitlist</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-mono tracking-wider mb-4">CONNECT</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:Sean@DrEvil.info" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-mono">
            © 2026 DR. EVIL'S COFFEE LABORATORY. ALL RIGHTS RESERVED.
          </p>
          <p className="text-zinc-600 text-xs">
            In memory of Philip Morris (1935-2020) • Founder of Morris Costumes • The Original Dr. Evil
          </p>
        </div>
      </div>
    </footer>
  );
}