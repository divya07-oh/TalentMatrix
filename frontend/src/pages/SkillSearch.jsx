import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Layers, 
  Send, 
  XCircle,
  Users,
  Grid,
  Filter
} from 'lucide-react';

import API from '../api';
import { getUser } from '../utils/getUser';

const SkillSearch = () => {
  const [skillQuery, setSkillQuery] = useState('');
  const [collegeQuery, setCollegeQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const user = getUser();

  const fetchResults = async () => {
    const query = skillQuery?.trim();
    const college = collegeQuery?.trim();
    if (!query) return;
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const response = await API.get(`/search/skills?skill=${encodeURIComponent(query)}&collegeId=${encodeURIComponent(college)}`);
      setResults(response.data.data || []);
    } catch (err) {
      console.error("Search Error:", err);
      setError(err.response?.data?.message || "Communication failure with Matrix hub.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults();
  };

  const handleSendRequest = async (receiverId, name) => {
    if (!user || !user._id) {
      alert("Unauthorized session. Please login.");
      return;
    }

    try {
      await API.post('/collaboration/send', {
        senderId: user._id,
        receiverId: receiverId,
        skill: skillQuery,
        message: `Requesting collaboration for ${skillQuery}`
      });
      alert(`Signal Sent to ${name}. Monitoring for verification...`);
    } catch (err) {
      console.error("Collaboration Request Error:", err);
      alert(err.response?.data?.message || `Failed to send signal to ${name}.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
                    <Grid size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Resource Discovery</span>
                </div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Skill Matrix <span className="text-stroke-accent">Search</span></h1>
            </div>
            <p className="text-[10px] font-bold text-text/40 uppercase tracking-[0.2em] max-w-xs md:text-right leading-relaxed">
                Filter through the global student population to identify high-value collaborators for architectural projects.
            </p>
        </div>

        {/* Search Controls */}
        <div className="arch-card p-1 shadow-2xl shadow-primary/5">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1 bg-border/20">
                <div className="relative bg-[#132A20] group transition-all duration-300">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-accent transition-colors" />
                    <input 
                        type="text" 
                        value={skillQuery}
                        onChange={(e) => setSkillQuery(e.target.value)}
                        placeholder="ENTER SKILL (E.G. REACT)"
                        className="w-full bg-transparent p-6 pl-16 text-xs font-black uppercase tracking-widest text-white focus:outline-none placeholder:text-white/40"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-focus-within:w-full"></div>
                </div>
                <div className="relative bg-[#1B4332] group transition-all duration-300">
                    <Layers size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-accent z-10 pointer-events-none transition-colors" />
                    <select 
                        value={collegeQuery}
                        onChange={(e) => setCollegeQuery(e.target.value)}
                        className="w-full bg-transparent p-6 pl-16 text-xs font-black uppercase tracking-widest text-white focus:outline-none appearance-none cursor-pointer relative z-0"
                    >
                        <option value="" className="bg-[#1B4332]">ALL COLLEGES</option>
                        <option value="MIT" className="bg-[#1B4332]">MIT Engineering</option>
                        <option value="STANFORD" className="bg-[#1B4332]">Stanford CS</option>
                        <option value="HARVARD" className="bg-[#1B4332]">Harvard Tech</option>
                    </select>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-focus-within:w-full"></div>
                </div>
                <button 
                   type="submit"
                   disabled={loading || !skillQuery}
                   className="btn btn-primary p-6 tracking-[0.4em] disabled:opacity-50"
                >
                    {loading ? 'Searching...' : <><Search size={16} /> Search</>}
                </button>
            </form>
        </div>

        {/* Results Area */}
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <Users size={16} className="text-white/40" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
                        {searched ? `${results.length} Students Found` : 'Search for students'}
                    </h2>
                </div>
                {searched && !loading && (
                    <button 
                        onClick={() => {setSearched(false); setSkillQuery(''); setCollegeQuery(''); setResults([]);}}
                        className="text-[9px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors"
                    >
                        Clear Search
                    </button>
                )}
            </div>

            {loading ? (
                <div className="py-32 flex flex-col items-center justify-center space-y-6">
                    <div className="w-16 h-16 border-[6px] border-background border-t-accent animate-spin ring-1 ring-border"></div>
                    <div className="text-center space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse block">Syncing Matrix Core...</span>
                        <span className="text-[8px] font-bold text-text/30 uppercase tracking-widest">Accessing global student nodes</span>
                    </div>
                </div>
            ) : error ? (
                <div className="py-20 arch-card border-red-200 bg-red-50/30 flex flex-col items-center text-center space-y-4">
                    <XCircle size={40} className="text-red-300" />
                    <div className="space-y-1">
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-900">Search Interrupted</h3>
                        <p className="text-[10px] font-bold text-red-700/60 uppercase">{error}</p>
                    </div>
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {results.map((student, idx) => (
                            <motion.div 
                                key={student.id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="arch-card p-8 flex flex-col justify-between group hover:border-accent transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] relative"
                            >
                                {/* Aesthetic Corner Indicator */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-accent/30 transition-all duration-500"></div>
                                
                                <div className="space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 border-2 border-border bg-background flex items-center justify-center font-black text-white text-2xl tracking-tighter group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                            {student.name.split(' ').map(n => n?.[0]).join('')}
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent block mb-1">Node Hub</span>
                                            <span className="text-xs font-black text-white uppercase tracking-wider">{student.collegeId || 'Hub Alpha'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-accent transition-colors duration-300">{student.name}</h3>
                                            <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest">{student.email}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {student.skills.map(skill => (
                                                <span key={skill.id} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-background border border-border text-white/60 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300">
                                                    {skill.skillName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleSendRequest(student.id, student.name)}
                                    className="btn-primary mt-12 w-full p-5 text-[10px] tracking-[0.4em] flex gap-3 group"
                                >
                                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /> Send Request
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : searched ? (
                <div className="py-40 border-2 border-dashed border-border flex flex-col items-center justify-center space-y-6 rounded-sm bg-background/30">
                    <div className="p-6 bg-primary border border-border rounded-full shadow-sm">
                        <Search size={32} className="text-border" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-text/60">No students found</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-text/30">Try searching for a different skill or college.</p>
                    </div>
                </div>
            ) : (
                <div className="py-40 grid-pattern-subtle border border-border flex flex-col items-center justify-center space-y-8 opacity-60 bg-primary/50 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/50 to-transparent"></div>
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <div className="w-20 h-20 border border-border bg-primary flex items-center justify-center animate-bounce duration-[2000ms]">
                            <Search size={40} className="text-white/10" />
                        </div>
                        <div className="text-center space-y-3">
                            <p className="text-sm font-black uppercase tracking-[0.5em] text-white">Start your search</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text/40 max-w-xs mx-auto leading-relaxed">
                                Search to find students from different colleges.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default SkillSearch;
