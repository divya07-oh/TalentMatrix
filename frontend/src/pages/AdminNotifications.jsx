import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Check, 
  Filter,
  MoreVertical,
  Activity,
  Layers,
  Search
} from 'lucide-react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Calling API: GET /api/notifications/system");
    setTimeout(() => {
      const mockNotifs = [
        { id: 1, type: 'verification', message: 'New Skill Verification Request: Node s-102 (Alex Rivera) submitted "React Architecture".', time: '2m ago', read: false, priority: 'high' },
        { id: 2, type: 'system', message: 'Global Database Synchronized. Campus Node Sync completed for Sector A-7.', time: '14m ago', read: true, priority: 'low' },
        { id: 3, type: 'alert', message: 'Suspicious Activity Detected: Multiple failed login attempts on Node s-4402.', time: '1h ago', read: false, priority: 'critical' },
        { id: 4, type: 'collab', message: 'Partnership Signal Initiated: New collaboration request between Node s-220 and Node s-91.', time: '3h ago', read: false, priority: 'medium' },
        { id: 5, type: 'system', message: 'System Backup Successful. All encrypted data fragments verified.', time: '1d ago', read: true, priority: 'low' }
      ];
      console.log("Response:", { success: true, count: 5, data: mockNotifs });
      setNotifications(mockNotifs);
    }, 1000);
  }, []);

  const toggleRead = (id) => {
    console.log(`Calling API: PUT /api/notifications/read/${id}`);
    setTimeout(() => {
       console.log("Response:", { success: true, message: "Notification status toggled" });
       setNotifications(notifications.map(n => 
         n.id === id ? { ...n, read: !n.read } : n
       ));
    }, 300);
  };

  const markAllRead = () => {
    console.log("Calling API: DELETE /api/notifications/clear/system");
    setTimeout(() => {
       console.log("Response:", { success: true, message: "All notifications read/cleared" });
       setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 500);
  };

  const deleteNotification = (id) => {
    console.log(`Calling API: DELETE /api/notifications/${id}`);
    setTimeout(() => {
       console.log("Response:", { success: true, message: "Notification deleted" });
       setNotifications(notifications.filter(n => n.id !== id));
    }, 300);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <Bell size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Notifications</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Notifications</h1>
        </div>
        <div className="flex items-center gap-4">
            <button 
               onClick={markAllRead}
               className="btn btn-secondary font-black uppercase tracking-[0.3em] flex items-center gap-2"
            >
                <CheckCircle2 size={14} /> Clear All
            </button>
            <button className="btn btn-secondary font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Filter size={14} /> Sort
            </button>
        </div>
      </div>

      <div className="flex justify-center max-w-4xl mx-auto">
         {/* Notifications Feed Area */}
         <div className="w-full space-y-6">
            <div className="relative group">
                <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search messages..."
                    className="w-full bg-transparent border border-border p-5 pl-14 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all shadow-sm rounded-md"
                />
            </div>

            <div className="space-y-4">
               <AnimatePresence mode="popLayout">
                  {notifications.map((notif, idx) => (
                     <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`arch-card p-0 flex flex-col md:flex-row items-stretch group overflow-hidden relative ${
                           !notif.read ? 'border-accent/40 bg-accent/[0.02]' : 'bg-transparent'
                        }`}
                     >
                        {/* Status Indicator Left */}
                        <div className={`w-1.5 transition-colors duration-500 ${
                           !notif.read ? 'bg-accent' : 'bg-border'
                        }`}></div>

                        <div className="flex-1 flex flex-col md:flex-row items-center p-8 gap-8">
                           {/* Icon Sector */}
                           <div className="flex items-center justify-center">
                              <div className={`w-12 h-12 border border-border bg-background flex items-center justify-center transition-all transform group-hover:rotate-12 ${
                                 notif.type === 'alert' ? 'text-red-500' : notif.type === 'verification' ? 'text-accent' : 'text-white'
                              }`}>
                                 {notif.type === 'alert' ? <AlertTriangle size={20} /> : notif.type === 'verification' ? <Layers size={20} /> : <Info size={20} />}
                              </div>
                           </div>

                           {/* Content Sector */}
                           <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text/20 italic">{notif.time}</span>
                              </div>
                              <p className={`text-[11px] font-bold uppercase tracking-wider leading-relaxed ${
                                 !notif.read ? 'text-white' : 'text-text/50 line-through decoration-text/20'
                              }`}>
                                 {notif.message}
                              </p>
                           </div>

                           {/* Actions Sector */}
                           <div className="flex md:flex-col lg:flex-row items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                 onClick={() => toggleRead(notif.id)}
                                 className={`w-10 h-10 flex items-center justify-center border transition-all ${
                                    notif.read ? 'border-primary text-white bg-primary/5' : 'border-border text-text/30 hover:border-primary hover:text-white'
                                 }`}
                                 title={notif.read ? 'Mark as Unread' : 'Mark as Read'}
                              >
                                 <Check size={18} />
                              </button>
                              <button 
                                 onClick={() => deleteNotification(notif.id)}
                                 className="w-10 h-10 flex items-center justify-center border border-border text-text/30 hover:border-red-500 hover:text-red-500 transition-all"
                                 title="Delete Notification"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </div>

                        {/* Aesthetic Footer Border */}
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
                     </motion.div>
                  )) }
               </AnimatePresence>
            </div>
         </div>
      </div>

      {/* Aesthetic Footer Node */}
      <div className="flex justify-center pt-8">
          <div className="flex items-center gap-3 py-6 px-12 bg-primary text-white shadow-2xl skew-x-[-12deg]">
             <Activity size={18} className="text-accent skew-x-[12deg]" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] skew-x-[12deg]">System Active</span>
             <div className="w-2 h-2 bg-accent animate-pulse rounded-full skew-x-[12deg]"></div>
          </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
