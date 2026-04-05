import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isExcludedRoute = ['/student', '/admin', '/login', '/signup'].some(route => location.pathname.startsWith(route));
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isExcludedRoute) return null;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-accent/20 shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center font-sans tracking-tight">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center relative overflow-hidden">
            <span className="text-white font-bold text-xl relative z-10">T</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </div>
          <span className="text-2xl font-bold text-white uppercase tracking-[0.1em]">TalentMatrix</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Features', 'How it Works'].map((item) => (
            <a 
              key={item} 
              href={isHomePage ? `#${item.toLowerCase().replace(/ /g, '-')}` : `/${isHomePage ? '' : `#${item.toLowerCase().replace(/ /g, '-')}`}`} 
              className="text-sm font-medium uppercase tracking-widest text-text hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l border-border pl-10">
            <Link to="/login" className="text-sm font-semibold uppercase tracking-widest text-text hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="btn btn-primary text-sm tracking-widest min-w-[120px]">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="btn btn-secondary md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-accent/20 py-6 md:hidden px-6 space-y-4 shadow-xl">
          {['Home', 'Features', 'How it Works'].map((item) => (
            <a 
              key={item} 
              href={isHomePage ? `#${item.toLowerCase().replace(/ /g, '-')}` : `/${isHomePage ? '' : `#${item.toLowerCase().replace(/ /g, '-')}`}`} 
              className="block text-sm font-semibold uppercase tracking-widest text-text hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-4 border-t border-border">
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-text py-2 text-center">Login</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full py-3 text-sm tracking-widest mt-2">Sign Up Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
