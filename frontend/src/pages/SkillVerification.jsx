import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Globe, 
  File, 
  Check, 
  X, 
  Send,
  User,
  UserCircle,
  Bell,
  Shield
} from 'lucide-react';

import API from '../api';

const SkillVerification = () => {
  const [pendingSkills, setPendingSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingSkills = async () => {
      try {
        setLoading(true);
        const response = await API.get('/skills/all');
        setPendingSkills(response.data.skills.map(s => ({
          id: s._id,
          student: s.userId?.name || 'Unknown',
          skill: s.skillName,
          github: s.githubLink,
          cert: s.certificate,
          status: s.status,
          time: new Date(s.createdAt).toLocaleDateString()
        })));
      } catch (error) {
        console.error("Fetch Pending Skills Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSkills();
  }, []);

  const handleAction = async (id, newStatus) => {
    try {
      await API.put(`/skills/verify/${id}`, { status: newStatus });
      setPendingSkills(prev => prev.map(skill => 
        skill.id === id ? { ...skill, status: newStatus } : skill
      ));
    } catch (error) {
      console.error("Action Error:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Skill Approval</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Approval <span className="text-stroke-accent">Center</span></h1>
        </div>
      </div>

      {/* Verification Status Quick Grid Look */}
      <div className="flex flex-wrap gap-4">
          <div className="px-6 py-3 bg-primary text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg">
             <Shield size={14} className="text-accent" /> Active List: {pendingSkills.filter(s => s.status === 'pending').length}
          </div>
          <div className="px-6 py-3 border border-border text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow arch-card p-0">
             <Bell size={14} className="text-accent" /> Needs Approval: {pendingSkills.length}
          </div>
      </div>

      {/* Main Verification Matrix */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {pendingSkills.map((notif, idx) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`arch-card p-0 flex flex-col md:flex-row items-stretch group overflow-hidden relative ${
                notif.status === 'approved' ? 'border-green-500/50 bg-green-50/10' : 
                notif.status === 'rejected' ? 'border-red-500/50 bg-red-50/10' : 'bg-transparent'
              }`}
            >
              {/* Status Indicator Left */}
              <div className={`w-1.5 transition-colors duration-500 ${
                  notif.status === 'approved' ? 'bg-accent' : 
                  notif.status === 'rejected' ? 'bg-red-500' : 'bg-accent'
              }`}></div>

              <div className="flex-1 flex flex-col md:flex-row items-center p-8 gap-8">
                  {/* Student Node */}
                  <div className="flex items-center gap-6 md:w-64 border-r border-border/50 pr-8">
                     <div className="w-14 h-14 bg-background border border-border flex items-center justify-center font-black text-white text-xl group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                        {notif.student[0]}
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-white">{notif.student}</h4>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-text/30 uppercase tracking-widest">
                           <User size={10} /> Node s-{notif.id}
                        </div>
                     </div>
                  </div>

                  {/* Skill Payload */}
                  <div className="flex-1 space-y-4">
                     <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-accent/60 italic">New Skill</span>
                        <h2 className="text-lg font-black text-white uppercase tracking-tight italic">{notif.skill}</h2>
                     </div>
                     
                     <div className="flex flex-wrap gap-4">
                        <a 
                           href={notif.github} 
                           target="_blank" 
                           rel="noreferrer"
                           className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text/50 hover:text-white transition-colors bg-background px-3 py-1.5 border border-border group/link"
                        >
                           <Globe size={12} className="group-hover/link:text-accent transition-colors" /> Git Repo <Send size={10} />
                        </a>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text/50 bg-background px-3 py-1.5 border border-border group/file cursor-pointer">
                           <File size={12} className="group-hover/file:text-accent transition-colors" /> Certificate
                        </div>
                     </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-col md:flex-row items-center gap-4 border-l border-border/50 pl-8">
                     <div className="text-right hidden xl:block mr-4">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-text/20 mb-1">Sent At</p>
                        <p className="text-[10px] font-bold text-white italic uppercase tracking-widest">{notif.time}</p>
                     </div>

                     {notif.status === 'pending' ? (
                       <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handleAction(notif.id, 'approved')}
                            className="w-12 h-12 flex items-center justify-center bg-primary text-white border border-primary hover:bg-transparent hover:text-white transition-all duration-300 shadow-md hover:shadow-xl group/btn btn-primary"
                          >
                             <Check size={20} className="group-hover/btn:scale-125 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleAction(notif.id, 'rejected')}
                            className="w-12 h-12 flex items-center justify-center border border-border text-text/30 hover:border-red-500 hover:text-red-500 transition-all duration-300 group/btn"
                          >
                             <X size={20} className="group-hover/btn:scale-125 transition-transform" />
                          </button>
                       </div>
                     ) : (
                       <div className={`px-6 py-3 border text-[10px] font-black uppercase tracking-[0.3em] italic animate-pulse ${
                          notif.status === 'approved' ? 'border-green-500/30 text-accent bg-green-50' : 'border-red-500/30 text-red-600 bg-red-50'
                       }`}>
                          {notif.status} signal active
                       </div>
                     )}
                  </div>
              </div>

              {/* Background Grid Aesthetic Hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Aesthetic Footer Node */}
      <div className="flex justify-center pt-8">
          <div className="flex items-center gap-3 py-4 px-8 border border-border/50 shadow-inner group">
              <div className="w-1 h-1 bg-accent animate-ping"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white/60 transition-colors">Monitoring Sector Skill Delta</span>
          </div>
      </div>
    </div>
  );
};

export default SkillVerification;
