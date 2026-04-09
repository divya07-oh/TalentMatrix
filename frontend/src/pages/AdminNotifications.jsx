import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Check, 
  Activity as ActivityIcon,
  Layers
} from 'lucide-react';

import API from '../api';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use a fixed admin userId placeholder; in future pass real admin user._id
        const response = await API.get('/notifications/admin');
        const data = response.data.userNotifications || response.data.notifications || [];
        setNotifications(data.map((n, i) => ({
          id: n._id || i,
          type: n.type || 'system',
          message: n.message,
          time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently',
          read: n.read || false,
          priority: n.priority || 'low'
        })));
      } catch (err) {
        console.error('Admin Notifications Error:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminNotifications();
  }, []);

  const toggleRead = async (id) => {
    try {
      await API.put(`/notifications/read/${id}`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: !n.read } : n
      ));
    } catch (err) {
      console.error('Toggle Read Error:', err);
    }
  };

  const markAllRead = async () => {
    try {
      setLoading(true);
      await API.delete('/notifications/clear/admin');
      setNotifications([]);
    } catch (err) {
      console.error('Clear All Admin Notifications Error:', err);
      setError('Failed to clear notifications.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Delete Notification Error:', err);
    }
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
               disabled={loading || notifications.length === 0}
               className="btn btn-secondary font-black uppercase tracking-[0.3em] flex items-center gap-2 disabled:opacity-50"
            >
                <CheckCircle2 size={14} /> Clear All
            </button>
        </div>
      </div>

      {error && (
        <div className="p-4 border border-red-500/30 bg-red-50/5 text-red-400 text-[10px] font-black uppercase tracking-widest">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-20 text-white/30 text-[10px] font-black uppercase tracking-widest animate-pulse">
          Loading Notifications...
        </div>
      )}

      <div className="flex justify-center max-w-4xl mx-auto">
         {/* Notifications Feed Area */}
         <div className="w-full space-y-6">
            <div className="space-y-4">
               <AnimatePresence mode="popLayout">
                  {!loading && notifications.length === 0 && !error && (
                    <div className="py-24 arch-card border-dashed border-border flex flex-col items-center justify-center space-y-6 opacity-40">
                      <Bell size={32} className="text-white/20" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">No notifications</p>
                    </div>
                  )}
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
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </div>

      {/* Aesthetic Footer Node */}
      <div className="flex justify-center pt-8">
          <div className="flex items-center gap-3 py-6 px-12 bg-primary text-white shadow-2xl skew-x-[-12deg]">
             <ActivityIcon size={18} className="text-accent skew-x-[12deg]" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] skew-x-[12deg]">System Active</span>
             <div className="w-2 h-2 bg-accent animate-pulse rounded-full skew-x-[12deg]"></div>
          </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
