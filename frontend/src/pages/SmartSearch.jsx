import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Search as SearchIcon, Filter, SlidersHorizontal, UserPlus } from 'lucide-react';

const SmartSearch = () => {
    return (
        <AppLayout title="Advanced Smart Search" role="admin">
            <div className="premium-card mb-32">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="flex-1 relative group">
                        <SearchIcon size={20} className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Query student intelligence (e.g., 'Python proficient researchers with AI focus')"
                            className="w-full h-56 bg-lightbg border-none rounded-xl pl-56 pr-16 text-16 focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        />
                    </div>
                    <button className="h-56 px-24 bg-primary text-white rounded-xl font-bold flex items-center gap-12 hover:bg-[#153a2b] transition-all">
                        <Filter size={18} /> Apply Filters
                    </button>
                    <button className="h-56 px-24 border-2 border-primary text-primary rounded-xl font-bold flex items-center gap-12 hover:bg-primary/5 transition-all">
                        <SlidersHorizontal size={18} /> Advanced
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="premium-card group cursor-pointer border-transparent hover:border-primary/20">
                        <div className="flex items-start justify-between mb-24">
                            <div className="flex items-center gap-16">
                                <div className="w-56 h-56 bg-primary/10 rounded-2xl flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    ST
                                </div>
                                <div>
                                    <h3 className="text-16 font-bold text-darkheading mb-4">Student Alpha</h3>
                                    <p className="text-12 text-bodytext uppercase tracking-widest font-bold">Comp Science • Yr 3</p>
                                </div>
                            </div>
                            <button className="p-8 bg-lightbg text-primary rounded-lg hover:bg-accent hover:text-white transition-all">
                                <UserPlus size={18} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-8 mb-24">
                            {['Python', 'React', 'AI', 'Cloud'].map(skill => (
                                <span key={skill} className="px-12 py-4 bg-gray-50 border border-gray-100 text-gray-600 rounded-full text-12 font-medium">{skill}</span>
                            ))}
                        </div>

                        <div className="pt-24 border-t border-gray-50 flex justify-between items-center bg-transparent">
                            <div className="text-12 text-bodytext">Intelligence Score</div>
                            <div className="text-16 font-black text-primary">92.8</div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
};

export default SmartSearch;
