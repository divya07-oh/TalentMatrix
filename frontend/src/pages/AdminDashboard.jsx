import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  PlusCircle,
  Layers
} from 'lucide-react';
import API from '../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/dashboard');
      const data = response.data;
      
      setStats([
        { label: 'All Students', value: data.totalStudents, icon: <Users size={20} />, trend: '+12%' },
        { label: 'All Skills', value: data.totalSkills, icon: <Layers size={20} />, trend: '+5.4%' },
        { label: 'Skills to Approve', value: data.pendingSkills, icon: <Clock size={20} />, trend: 'Action Needed' },
        { label: 'Collaborations', value: data.totalCollaborations, icon: <Users size={20} />, trend: '+18.2%' },
      ]);
    } catch (err) {
      console.error("Fetch Admin Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* College Profile Hero Sector (From Reference Image) */}
      <section className="relative group">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
              <Layers size={18} className="text-white/40" />
           </div>
           <div className="flex flex-col">
              <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white">College Profile</h2>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mt-1">Visible to students and partners on the platform.</p>
           </div>
        </div>

        <div className="arch-card p-12 bg-surface border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 grid-pattern-subtle opacity-5"></div>
           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
              {/* College Logo Square */}
              <div className="w-48 h-48 bg-accent flex items-center justify-center relative shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                 <span className="text-8xl font-black text-black">S</span>
                 <button className="absolute bottom-4 right-4 w-10 h-10 bg-black/80 hover:bg-black flex items-center justify-center text-white transition-colors">
                    <PlusCircle size={18} />
                 </button>
              </div>

              {/* College Details Form Aesthetic */}
              <div className="flex-1 space-y-8 w-full max-w-xl">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.5em] text-accent px-1">College Name</label>
                    <div className="p-4 bg-black/40 border border-white/5 text-xl font-black uppercase tracking-widest text-white">
                       Stanford University
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.5em] text-accent px-1">College Website</label>
                    <div className="p-4 bg-black/40 border border-white/5 text-sm font-bold tracking-widest text-white/40 italic">
                       stanford.edu
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.5em] text-accent px-1">Our Mission / Bio</label>
                    <p className="text-sm font-medium leading-relaxed text-white/60 bg-black/20 p-6 border-l-2 border-accent">
                       Leading the way in student innovation and cross-college collaboration. Our institution fosters a culture of excellence and interdisciplinary research.
                    </p>
                 </div>
              </div>

              {/* Status Indicator (Right Side) */}
              <div className="hidden xl:flex flex-col gap-4 text-right">
                 <div className="p-6 bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Profile Completeness</span>
                    <div className="text-2xl font-black text-accent italic">92%</div>
                 </div>
                 <button className="btn btn-primary w-full shadow-lg">Save Changes</button>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Grid Refined */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="arch-card p-8 border-white/5 hover:border-accent/40 group overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white/5 text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">{stat.icon}</div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 text-accent-bright">
                {stat.trend}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] uppercase">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
