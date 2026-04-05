import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Bell,
  PlusCircle,
  UserCircle,
  Layers
} from 'lucide-react';

const AdminDashboard = () => {
  useEffect(() => {
    console.log("Calling API: GET /api/admin/dashboard");
    setTimeout(() => {
      console.log("Response:", { success: true, data: "dashboard stats fetched" });
    }, 500);
  }, []);
  
  const stats = [
    { label: 'All Students', value: '4,289', icon: <Users size={20} />, trend: '+12%', color: 'primary' },
    { label: 'All Skills', value: '12,402', icon: <Layers size={20} />, trend: '+5.4%', color: 'accent' },
    { label: 'Skills to Approve', value: '84', icon: <Clock size={20} />, trend: 'Needs Action', color: 'accent' },
    { label: 'Collaborations', value: '2,941', icon: <Users size={20} />, trend: '+18.2%', color: 'primary' },
  ];

  const recentActivities = [
    { id: 1, type: 'user', action: 'New student added from MIT.', time: '2m ago' },
    { id: 2, type: 'skill', action: "Skill 'React Native' approved for student.", time: '14m ago' },
    { id: 3, type: 'system', action: 'System update completed.', time: '1h ago' },
    { id: 4, type: 'collab', action: 'New collaboration started.', time: '3h ago' },
  ];

  const topSkills = [
    { name: 'React', count: 1240, growth: '+22%' },
    { name: 'Vite', count: 892, growth: '+15%' },
    { name: 'Tailwind CSS', count: 654, growth: '+10%' },
    { name: 'Node.js', count: 421, growth: '+5%' },
  ];

  return (
    <div className="space-y-12">
      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="arch-card p-6 border-l-4 border-l-primary hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-background border border-border group-hover:bg-accent group-hover:text-white transition-all duration-500 text-white">{stat.icon}</div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 ${stat.trend.includes('+') ? 'text-accent bg-green-50' : 'text-accent bg-accent/5'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Recent Activity Sector */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Layers size={18} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Latest Activity</h3>
              </div>
              <button className="btn btn-secondary font-black uppercase flex items-center gap-2">
                View All <PlusCircle size={12} />
              </button>
          </div>

          <div className="space-y-4">
             {recentActivities.map((act) => (
                <div key={act.id} className="p-6 arch-card flex flex-col md:flex-row items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                   
                   <div className="flex items-center gap-6 flex-1">
                       <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          {act.type === 'user' ? <Users size={16} /> : act.type === 'skill' ? <CheckCircle2 size={16} /> : act.type === 'system' ? <Layers size={16} /> : <Bell size={16} />}
                       </div>
                      <div className="space-y-1">
                         <p className="text-[11px] font-bold text-white uppercase tracking-wider">{act.action}</p>
                         <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black uppercase text-text/20 tracking-widest">{act.type} update</span>
                            <span className="w-1 h-1 bg-border rounded-full"></span>
                            <span className="text-[9px] font-bold text-text/30 uppercase tracking-widest">{act.time}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="btn btn-outline font-black uppercase tracking-widest flex items-center gap-2">
                          View details <PlusCircle size={10} />
                       </button>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Quick Insights Sector */}
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
               <PlusCircle size={18} className="text-white" />
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Popular Skills</h3>
            </div>

           <div className="space-y-4 shadow-sm arch-card p-8 bg-transparent relative overflow-hidden group">
              <div className="absolute inset-0 grid-pattern-subtle opacity-5 pointer-events-none"></div>
              <div className="space-y-6 relative z-10">
                 <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Trending</span>
                     <PlusCircle size={16} className="text-accent" />
                 </div>
                {topSkills.map((skill, i) => (
                  <div key={i} className="space-y-2 group/skill">
                     <div className="flex justify-between items-end">
                        <p className="text-[11px] font-black text-white uppercase tracking-wider group-hover/skill:text-accent transition-colors">{skill.name}</p>
                        <span className="text-[9px] font-black text-accent bg-green-50 px-2 py-0.5 tracking-widest">{skill.growth}</span>
                     </div>
                     <div className="h-1.5 w-full bg-background overflow-hidden relative border border-border">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(skill.count / 1500) * 100}%` }}
                           transition={{ duration: 1, delay: i * 0.1 }}
                           className="h-full bg-primary group-hover/skill:bg-accent transition-colors duration-500"
                        />
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Diagnostics Interface Aesthetic */}
           <div className="bg-primary p-8 space-y-6 relative overflow-hidden border-b-8 border-accent group shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-white/5 rounded-full pointer-events-none rotate-12 group-hover:rotate-0 transition-transform duration-700"></div>
              <div className="space-y-2 relative z-10">
                 <h4 className="text-xs font-black uppercase text-accent tracking-[0.4em]">System Status</h4>
                 <div className="flex items-center gap-10">
                    <div className="text-3xl font-black text-white tracking-widest uppercase italic">98.4%</div>
                    <div className="flex-1 space-y-1">
                       <div className="w-full h-1 bg-primary/10 overflow-hidden rounded-full">
                          <div className="w-[98.4%] h-full bg-accent animate-pulse"></div>
                       </div>
                    </div>
                 </div>
              </div>
              <button className="btn btn-primary w-full font-black uppercase tracking-[0.4em] relative z-10">
                 System Info
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
