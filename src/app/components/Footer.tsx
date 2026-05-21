import { FlaskConical, Instagram, Youtube, Mail, Facebook, Twitter } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1.1-.07z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: 'Instagram',
    handle: '@DrEvilsCoffee',
    href: 'https://www.instagram.com/DrEvilsCoffee',
    icon: Instagram,
  },
  {
    label: 'TikTok',
    handle: '@DrEvilsCoffee',
    href: 'https://www.tiktok.com/@DrEvilsCoffee',
    icon: TikTokIcon,
  },
  {
    label: 'Facebook',
    handle: '/DrEvilsCoffee',
    href: 'https://www.facebook.com/DrEvilsCoffee',
    icon: Facebook,
  },
  {
    label: 'YouTube',
    handle: '@DrEvilsCoffee',
    href: 'https://www.youtube.com/@DrEvilsCoffee',
    icon: Youtube,
  },
  {
    label: 'X',
    handle: '@DrEvilsCoffee',
    href: 'https://x.com/DrEvilsCoffee',
    icon: Twitter,
  },
] as const;

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
              <li><a href="#waitlist" className="text-zinc-500 hover:text-white text-sm transition-colors" onClick={(e) => handleAnchorClick(e, '#waitlist')}>Join the Lab</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-mono tracking-wider mb-4">CONNECT</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:Sean@DrEvil.info" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  Email
                </a>
              </li>
              {socialLinks.map(({ label, handle, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                    aria-label={`${label} — ${handle}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>
                      {label}
                      <span className="text-zinc-600 group-hover:text-zinc-400 ml-1 font-mono text-xs">
                        {handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
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