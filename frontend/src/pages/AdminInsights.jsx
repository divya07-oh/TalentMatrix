import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Activity as ActivityIcon, 
  Users, 
  Zap,
  Globe,
  Award,
  ArrowUpRight,
  Shield,
  ChevronRight
} from 'lucide-react';
import API from '../api';

const AdminInsights = () => {
  const [data, setData] = useState(null);
  const [dashStats, setDashStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const [insightsRes, dashRes] = await Promise.all([
        API.get('/admin/insights'),
        API.get('/admin/dashboard')
      ]);
      setData(insightsRes.data);
      setDashStats(dashRes.data);
    } catch (err) {
      console.error("Fetch Insights Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const topSkills = data?.data?.topSkills?.map(s => ({
    name: s.name || s._id,
    frequency: s.count,
    percentage: Math.min(100, (s.count / 10) * 100), 
    trend: `${s.count} nodes`
  })) || [];

  // Top students not yet provided by backend — renders empty gracefully
  const activeStudents = [];

  const activitySummary = data?.data?.recentActivities?.map((act, i) => ({
    id: act.id || i,
    type: act.activityType || 'System',
    detail: act.title || 'Platform update',
    time: act.date ? new Date(act.date).toLocaleDateString() : 'Just now'
  })) || [];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <ActivityIcon size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Overview</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Insights</h1>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={() => {
                  alert("Generating Report...");
                  setTimeout(() => alert("Report downloaded successfully via Mock API."), 1000);
                }}
                className="btn btn-secondary font-black uppercase tracking-[0.3em] flex items-center gap-2"
            >
                <ArrowUpRight size={14} /> Download Report
            </button>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="arch-card border-l-4 border-l-primary p-8 space-y-6 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 border border-border flex items-center justify-center p-2 group-hover:bg-primary group-hover:text-white transition-all text-white"><Users size={20} /></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-1">Students</span>
            </div>
            <div className="space-y-1">
               <h3 className="text-[10px] font-black uppercase text-white/30 tracking-widest">Total Students</h3>
               <p className="text-4xl font-black text-white tracking-tighter">{dashStats?.totalStudents ?? '—'}</p>
            </div>
         </div>
         <div className="arch-card border-l-4 border-l-primary p-8 space-y-6 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 border border-border flex items-center justify-center p-2 group-hover:bg-primary group-hover:text-white transition-all text-white"><Zap size={20} /></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-1">Approved</span>
            </div>
            <div className="space-y-1">
               <h3 className="text-[10px] font-black uppercase text-white/30 tracking-widest">Approved Skills</h3>
               <p className="text-4xl font-black text-white tracking-tighter">{dashStats?.approvedSkills ?? '—'}</p>
            </div>
         </div>
         <div className="arch-card border-l-4 border-l-primary p-8 space-y-6 group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 border border-border flex items-center justify-center p-2 group-hover:bg-primary group-hover:text-white transition-all text-white"><Globe size={20} /></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-1">Collaborations</span>
            </div>
            <div className="space-y-1">
               <h3 className="text-[10px] font-black uppercase text-white/30 tracking-widest">Total Collaborations</h3>
               <p className="text-4xl font-black text-white tracking-tighter">{dashStats?.totalCollaborations ?? '—'}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
         {/* Top Skills Monitoring Sector */}
         <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border pb-4">
               <Layers size={18} className="text-accent" />
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Skill List</h3>
            </div>
            <div className="arch-card p-10 space-y-8 relative overflow-hidden group">
               <div className="absolute inset-0 grid-pattern-subtle opacity-5 pointer-events-none"></div>
               {topSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-3 group/skill relative z-10 transition-all duration-300 hover:translate-x-2">
                     <div className="flex justify-between items-end">
                        <div className="space-y-1">
                           <p className="text-xs font-black text-white uppercase tracking-wider group-hover/skill:text-accent transition-colors">{skill.name}</p>
                           <p className="text-[9px] font-bold text-text/30 uppercase tracking-widest leading-none italic">Frequency: {skill.frequency} nodes</p>
                        </div>
                        <span className="text-[9px] font-black text-accent bg-green-50 px-2 py-1 tracking-widest shadow-sm">{skill.trend}</span>
                     </div>
                     <div className="h-2 w-full bg-background border border-border overflow-hidden relative">
                        <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.percentage}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.2, delay: idx * 0.15 }}
                           className="h-full bg-primary group-hover/skill:bg-accent transition-colors duration-500 shadow-[0_0_10px_rgba(27,67,50,0.3)]"
                        />
                     </div>
                  </div>
               ))}
               <button className="btn btn-secondary w-full font-black uppercase tracking-[0.4em] group-hover:text-accent mt-4">
                  Full Skill Map <ChevronRight size={12} className="inline ml-1" />
               </button>
            </div>
         </div>

         {/* leaderboard & activity Sector */}
         <div className="grid grid-cols-1 gap-12">
            <div className="space-y-8">
               <div className="flex items-center gap-3 border-b border-border pb-4">
                  <Award size={18} className="text-accent" />
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Top Students</h3>
               </div>
               <div className="arch-card p-0 overflow-hidden shadow-lg border-t-4 border-t-primary">
                  <table className="w-full text-left">
                     <thead className="bg-background border-b border-border">
                        <tr>
                           <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-text/40">Student</th>
                           <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-text/40">Skills</th>
                           <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-text/40">Approval</th>
                           <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-text/40">Activity</th>
                        </tr>
                     </thead>
                     <tbody>
                        {activeStudents.map((st, i) => (
                           <tr key={i} className="border-b border-border/50 group/row hover:bg-primary/5 transition-colors">
                              <td className="px-6 py-6 flex items-center gap-4">
                                 <div className="w-10 h-10 border border-border bg-background group-hover/row:bg-primary group-hover/row:text-white flex items-center justify-center font-black text-xs transition-all">
                                    {st.name[0]}
                                 </div>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{st.name}</span>
                              </td>
                              <td className="px-6 py-6 text-xs font-bold text-white italic leading-none">{st.skills}</td>
                              <td className="px-6 py-6 text-xs font-bold text-white italic leading-none">{st.verifications}</td>
                              <td className="px-6 py-6">
                                 <span className={`text-[8px] font-black px-2 py-1 uppercase tracking-widest border ${
                                    st.activity === 'High' ? 'border-accent text-accent bg-accent/5' : 'border-border text-text/30'
                                 }`}>
                                    {st.activity}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Global Activity feed look */}
            <div className="space-y-8">
               <div className="flex items-center gap-3 border-b border-border pb-4">
                  <ActivityIcon size={18} className="text-white" />
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Platform Activity Summary</h3>
               </div>
               <div className="ring-1 ring-border p-10 arch-card relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-primary/2 opacity-[0.02] pointer-events-none"></div>
                  <div className="space-y-8">
                     {activitySummary.map((act, i) => (
                        <div key={act.id} className="relative pl-8 group">
                           <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full transition-all group-hover:scale-125 ${i === 0 ? 'bg-accent animate-ping' : 'bg-primary/20'}`}></div>
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase text-accent tracking-[0.3em] leading-none mb-2">{act.type}</p>
                                 <p className="text-[11px] font-bold text-white uppercase tracking-wider leading-relaxed">{act.detail}</p>
                              </div>
                              <span className="text-[8px] font-black uppercase text-text/20 tracking-widest whitespace-nowrap">{act.time}</span>
                           </div>
                           {i !== activitySummary.length - 1 && (
                              <div className="w-[1px] h-14 bg-border absolute left-[3.5px] top-6"></div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Aesthetic intelligence footer */}
      <div className="flex justify-center pt-8">
         <div className="flex items-center gap-3 py-6 px-12 bg-primary text-white shadow-2xl skew-x-[-12deg]">
            <Shield size={18} className="text-accent skew-x-[12deg]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] skew-x-[12deg]">System Working</span>
            <div className="w-2 h-2 bg-accent animate-pulse rounded-full skew-x-[12deg]"></div>
         </div>
      </div>
    </div>
  );
};

export default AdminInsights;
