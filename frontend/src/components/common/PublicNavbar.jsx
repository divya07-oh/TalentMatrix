import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const PublicNavbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110">
                        <Brain size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-22 font-bold tracking-tight text-primary font-sans">
                        TalentMatrix <span className="text-secondary opacity-90">EDU</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-12">
                    <a href="#features" className="text-15 font-semibold text-talentgray hover:text-primary transition-colors">Features</a>
                    <a href="#about" className="text-15 font-semibold text-talentgray hover:text-primary transition-colors">About</a>

                    <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>

                    <Link to="/login" className="text-15 font-semibold text-talentgray hover:text-primary transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="bg-primary text-white px-20 py-8 rounded-lg font-bold hover:bg-[#153a2b] transition-all shadow-sm hover:shadow-md text-14">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
