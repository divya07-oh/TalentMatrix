import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const TopNavbar = ({ title }) => {
    return (
        <header className="h-[80px] bg-white border-b border-gray-100 flex items-center justify-between px-8 fixed top-0 right-0 left-[280px] z-40">
            <div className="flex-1">
                <h1 className="text-24 font-semibold text-darkheading">{title}</h1>
            </div>

            {/* Global Search - Centered */}
            <div className="flex-[2] flex justify-center">
                <div className="relative group w-full max-w-[400px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search talent, skills, or projects..."
                        className="w-full h-10 pl-10 pr-4 bg-lightbg border-none rounded-lg text-14 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 flex items-center justify-end gap-6">
                <button className="relative p-2 text-talentgray hover:bg-lightbg rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-100 group cursor-pointer">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white text-14 font-semibold shadow-md">
                        AT
                    </div>
                    <div className="flex flex-col">
                        <span className="text-14 font-semibold text-darkheading group-hover:text-primary transition-colors">Dr. Aris Thorne</span>
                        <span className="text-10 uppercase tracking-widest font-bold text-gray-400">Admin</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
