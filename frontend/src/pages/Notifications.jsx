import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Trash2, 
  CheckCircle2, 
  ShieldAlert, 
  Users, 
  MessageSquare,
  Clock,
  ArrowRight,
  MoreVertical,
  Circle,
  Inbox,
  Filter
} from 'lucide-react';

import API from '../api';
import { getUser } from '../utils/getUser';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  const fetchNotifs = async () => {
    if (!user || !user._id) return;
    setLoading(true);
    try {
      const response = await API.get(`/notifications/${user._id}`);
      setNotifications(response.data.userNotifications.map(n => ({
        id: n._id,
        type: 'system', // Default type
        message: n.message,
        time: 'Recently',
        isRead: false
      })));
    } catch (err) {
      console.error("Fetch Notifications Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, [user?._id]);

  const markAsRead = (id) => {
    // Local update for UX
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const clearNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error("Delete Notification Error:", err);
    }
  };

  const clearAll = async () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'collaboration': return <Users size={16} />;
      case 'verification': return <CheckCircle2 size={16} />;
      case 'system': return <ShieldAlert size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'collaboration': return 'text-accent border-accent/20 bg-accent/5';
      case 'verification': return 'text-green-500 border-green-500/20 bg-accent/5';
      case 'system': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      default: return 'text-white border-primary/20 bg-primary/5';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <Bell size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Notifications</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My <span className="text-stroke-accent">Alerts</span></h1>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={clearAll}
                className="btn btn-danger font-black uppercase tracking-[0.3em] flex items-center gap-2"
            >
                <Trash2 size={14} /> Clear All
            </button>
            <div className="h-6 w-[1px] bg-border hidden md:block"></div>
            <button className="btn btn-secondary font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Filter size={14} /> Filter
            </button>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="px-4 py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-3">
            Total: {notifications.length}
        </div>
        <div className="px-4 py-2 bg-accent text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-3">
            Unread: {notifications.filter(n => !n.isRead).length}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notif, idx) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => markAsRead(notif.id)}
                className={`arch-card p-6 flex items-start justify-between gap-6 group transition-all duration-300 cursor-pointer hover:border-accent hover:shadow-lg relative overflow-hidden ${
                  notif.isRead ? 'bg-transparent opacity-70' : 'bg-transparent border-l-4 border-accent shadow-md'
                }`}
              >
                <div className="flex items-start gap-6 relative z-10 w-full">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${getTypeStyle(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{notif.type}</span>
                      <span className="w-1 h-1 bg-border rounded-full"></span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-text/30 uppercase tracking-widest">
                        <Clock size={10} /> {notif.time}
                      </div>
                    </div>
                    <p className={`text-sm tracking-tight leading-relaxed max-w-2xl transition-colors duration-300 ${
                        notif.isRead ? 'text-text/50' : 'text-white font-black'
                    }`}>
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4 relative z-10">
                  {!notif.isRead && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(255,193,7,0.8)]"
                    />
                  )}
                  <button className="btn btn-secondary p-2 opacity-0 group-hover:opacity-100">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Micro-Interaction Background */}
                <div className="absolute inset-0 bg-accent/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </motion.div>
            ))
          ) : (
            <div className="py-40 arch-card border-dashed border-border flex flex-col items-center justify-center space-y-8 opacity-40 bg-primary/50">
              <div className="w-20 h-20 border border-border flex items-center justify-center bg-primary rotate-12">
                <Inbox size={32} className="-rotate-12 text-white/10" />
              </div>
              <div className="text-center space-y-3">
                <p className="text-sm font-black uppercase tracking-[0.5em] text-white">No new notifications</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text/40 max-w-xs mx-auto leading-relaxed">
                  Everything is up to date. We'll notify you when something happens.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Aesthetic Footer */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-center pt-8">
            <div className="flex items-center gap-2">
                <Circle size={8} className="text-accent fill-accent animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Waiting for new messages</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
