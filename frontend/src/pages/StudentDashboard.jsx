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

const StudentDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log("Calling API: GET /api/collaboration/user/123");
    setTimeout(() => {
      const dbRequests = [
        { id: 1, name: 'Emma Wilson', college: 'MIT', skill: 'React Architecture', time: '2h ago' },
        { id: 2, name: 'Liam Chen', college: 'Stanford', skill: 'Data Structures', time: '5h ago' },
        { id: 3, name: 'Sophia Garcia', college: 'Harvard', skill: 'UX Research', time: '1d ago' },
      ];
      console.log("Response:", { success: true, count: 3, data: dbRequests });
      setRequests(dbRequests);
    }, 1000);
  }, []);

  const stats = [
    { label: 'All Skills', value: 12, icon: <PlusCircle size={20} />, color: 'primary' },
    { label: 'Approved Skills', value: 8, icon: <CheckCircle2 size={20} />, color: 'accent' },
    { label: 'Waiting for Approval', value: 3, icon: <Clock size={20} />, color: 'primary/60' },
    { label: 'Collaborations', value: 5, icon: <Users size={20} />, color: 'accent' },
  ];

  const notifications = [
    { id: 1, text: 'Your "Vite Optimization" skill was approved.', time: '10m ago', type: 'success' },
    { id: 2, text: 'New message from Project Alpha lead.', time: '1h ago', type: 'message' },
    { id: 3, text: 'Collaboration invitation from Oxford.', time: '3h ago', type: 'invite' },
  ];

  const handleRequest = (id, action) => {
    console.log(`Calling API: PUT /api/collaboration/respond/${id}`);
    console.log("Payload:", { action });
    
    setTimeout(() => {
      console.log("Response:", { success: true, message: `Request successfully ${action}ed` });
      setRequests(prev => prev.filter(req => req.id !== id));
    }, 800);
  };

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="arch-card flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">{stat.label}</span>
              <div className="text-accent p-2 bg-background ring-1 ring-border">{stat.icon}</div>
            </div>
            <div className="text-4xl font-black text-white tracking-tighter">
              {stat.value.toString().padStart(2, '0')}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Collaboration Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Collaboration Requests</h3>
            <Link to="/student/collaboration" className="btn btn-secondary font-bold uppercase tracking-widest">See All</Link>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {requests.length > 0 ? requests.map((req) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 border border-border flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-sm border-l-4 border-l-primary transition-all group arch-card"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 border border-border bg-background flex items-center justify-center font-black text-white uppercase">
                       {req.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">{req.name} <span className="text-text/40 font-bold ml-2">[{req.college}]</span></h4>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Skill: {req.skill}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => handleRequest(req.id, 'Accept')}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-primary hover:bg-transparent hover:text-white transition-all"
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button 
                      onClick={() => handleRequest(req.id, 'Reject')}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-border text-text/40 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all"
                    >
                      <X size={14} /> Decline
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20 border-2 border-dashed border-border">
                   <p className="text-[10px] font-black uppercase text-text/40 tracking-[0.3em]">No new notifications</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Notification Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Notifications</h3>
            </div>
          </div>
          
          <div className="arch-card p-0 divide-y divide-border border-accent/20">
            {notifications.map((note) => (
              <div key={note.id} className="p-5 hover:bg-background transition-colors space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-[11px] font-bold text-white/80 leading-relaxed pr-8">{note.text}</p>
                  <span className="text-[9px] font-bold uppercase text-text/40 tracking-widest">{note.time}</span>
                </div>
                <div className="w-8 h-[1px] bg-accent"></div>
              </div>
            ))}
          </div>
          
          {/* Quick Action Card Overlay Look */}
          <div className="bg-primary p-8 space-y-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 grid-pattern opacity-10 pointer-events-none"></div>
             <div className="space-y-2 relative z-10">
                <h4 className="text-xs font-black uppercase text-accent tracking-[0.3em]">Next Steps</h4>
                <p className="text-white text-[10px] font-medium leading-relaxed opacity-70 uppercase tracking-widest">
                  Connect with students at other colleges to build great projects.
                </p>
             </div>
             <Link to="/student/projects" className="btn btn-secondary w-full font-black uppercase tracking-[0.4em] transform group-hover:-translate-y-1 text-center block">
                Find Projects
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
