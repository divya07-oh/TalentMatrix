import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  X,
  Check,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

import API from '../api';
import { getUser } from '../utils/getUser';

const StudentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Stats
        const statsRes = await API.get(`/student/dashboard/${user._id}`);
        const apiStats = [
          { label: 'All Skills', value: statsRes.data.totalSkills, icon: <PlusCircle size={20} /> },
          { label: 'Approved Skills', value: statsRes.data.approvedSkills, icon: <CheckCircle2 size={20} /> },
          { label: 'Pending Approval', value: statsRes.data.pendingSkills, icon: <Clock size={20} /> },
          { label: 'Collaborations', value: statsRes.data.collaborationCount, icon: <Users size={20} /> },
        ];
        setStats(apiStats);

        // 2. Fetch Collaboration Requests
        const collabRes = await API.get(`/collaboration/user/${user._id}`);
        // Show only received pending requests on dashboard
        const receivedPending = collabRes.data.data.received.filter(r => r.status === 'pending');
        setRequests(receivedPending.map(r => ({
          id: r._id,
          name: r.senderId.name,
          college: 'MIT', // Backend populate doesn't have college yet, keeping static for now or extracting if available
          skill: r.skill || 'React Development',
          time: 'Recently'
        })));

        // 3. Fetch Notifications
        const notifyRes = await API.get(`/notifications/${user._id}`);
        setNotifications(notifyRes.data.userNotifications.slice(0, 5).map(n => ({
          id: n._id,
          text: n.message,
          time: 'Recently'
        })));

      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?._id]);

  const handleRequest = async (id, action) => {
    try {
      const status = action === 'Accept' || action === 'Approve' ? 'accepted' : 'rejected';
      await API.put(`/collaboration/respond/${id}`, { status });
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      console.error("Response Error:", error);
      alert("Failed to respond to request.");
    }
  };

  return (
    <div className="space-y-16 pb-12">
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
                Trend: Stable
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-white tracking-tighter">{stat.value.toString().padStart(2, '0')}</p>
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Collaboration Requests */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
             <div className="flex items-center gap-4">
                <Users size={18} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Collaboration Requests</h3>
             </div>
             <Link to="/student/collaboration" className="text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-white transition-colors">View All</Link>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {requests.length > 0 ? requests.map((req) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 arch-card border-white/5 hover:border-accent/30 flex flex-col md:flex-row items-center justify-between gap-8 group"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-xl group-hover:bg-accent group-hover:text-black transition-all duration-500">
                       {req.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">{req.name}</h4>
                      <div className="flex items-center gap-4">
                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">[{req.college}]</span>
                         <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                         <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{req.skill}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => handleRequest(req.id, 'Accept')}
                      className="btn btn-primary flex-1 md:flex-none"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleRequest(req.id, 'Reject')}
                      className="btn btn-secondary flex-1 md:flex-none"
                    >
                      Decline
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-24 border-2 border-dashed border-white/5 arch-card bg-transparent">
                   <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">No pending transmissions</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Notifications Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-4">
              <Bell size={18} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Status Feed</h3>
            </div>
          </div>
          
          <div className="arch-card p-0 border-white/5 bg-transparent overflow-hidden">
            {notifications.map((note) => (
              <div key={note.id} className="p-6 bg-white/[0.01] hover:bg-white/[0.03] transition-all border-b border-white/5 last:border-0 group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">{note.time}</span>
                  <div className="w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent animate-pulse"></div>
                </div>
                <p className="text-[11px] font-bold text-white/70 leading-relaxed uppercase tracking-wider">{note.text}</p>
              </div>
            ))}
          </div>
          
          {/* Quick Connect Aesthetic Card */}
          <div className="arch-card p-10 bg-accent relative overflow-hidden group border-none shadow-[0_0_50px_rgba(212,175,55,0.2)]">
             <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>
             <div className="relative z-10 space-y-6">
                <h4 className="text-sm font-black uppercase text-black tracking-[0.3em]">Network Active</h4>
                <p className="text-black/60 text-[10px] font-bold leading-relaxed uppercase tracking-[0.2em]">
                   Establishing inter-collegiate protocols for innovation extraction.
                </p>
                <Link to="/student/projects" className="btn bg-black text-white w-full shadow-2xl hover:scale-105 active:scale-95 transition-transform">
                   Join Mission
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
