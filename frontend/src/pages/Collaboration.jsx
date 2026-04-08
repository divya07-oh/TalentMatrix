import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity as ActivityIcon, Users, Send, Inbox, Clock, CheckCircle2, XCircle, MessageSquare, User, ShieldCheck, ChevronRight 
} from 'lucide-react';

import API from '../api';
import { getUser } from '../utils/getUser';

const Collaboration = () => {
  const user = getUser();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState(isAdmin ? 'all' : 'received'); // 'sent', 'received', or 'all'
  const [requests, setRequests] = useState({ sent: [], received: [], all: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchRequests = async () => {
    if (!user || !user._id) return;
    
    setLoading(true);
    try {
      const response = await API.get(`/collaboration/user/${user._id}`);
      const data = response.data.data;

      setRequests({
        sent: (data.sent || []).map(r => ({
          id: r._id,
          status: r.status,
          createdAt: r.createdAt,
          message: r.message,
          name: r.receiverId?.name || 'Unknown',
          skill: r.skill
        })),
        received: (data.received || []).map(r => ({
          id: r._id,
          status: r.status,
          createdAt: r.createdAt,
          message: r.message,
          name: r.senderId?.name || 'Unknown',
          skill: r.skill
        })),
        all: (data.all || []).map(r => ({
          id: r._id,
          status: r.status,
          createdAt: r.createdAt,
          message: r.message,
          senderName: r.senderId?.name || 'Unknown',
          receiverName: r.receiverId?.name || 'Unknown',
          skill: r.skill
        }))
      });
    } catch (err) {
      console.error("Fetch Collaboration Error:", err);
      setError("Failed to retrieve connection nodes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?._id]);

  const handleResponse = async (requestId, status) => {
    setActionLoading(requestId);
    try {
      await API.put(`/collaboration/respond/${requestId}`, { status });
      setRequests(prev => ({
        ...prev,
        received: prev.received.map(req => 
          req.id === requestId ? { ...req, status } : req
        )
      }));
    } catch (err) {
      console.error("Collaboration Response Error:", err);
      alert("Failed to update status.");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'accepted': return 'bg-accent/10 text-accent border-green-200';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-amber-500/10 text-amber-600 border-amber-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle2 size={12} />;
      case 'rejected': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const currentData = activeTab === 'all' ? requests.all : (activeTab === 'sent' ? requests.sent : requests.received);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent">
            <Users size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Connection</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Collaboration</h1>
        </div>
        <p className="text-[10px] font-bold text-text/40 uppercase tracking-[0.2em] max-w-xs md:text-right leading-relaxed">
          Manage your project invitations and connections with other students.
        </p>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-border p-1 bg-background mb-8">
        {isAdmin && (
           <button 
           onClick={() => setActiveTab('all')}
           className={`flex-1 flex items-center justify-center gap-3 py-6 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
             activeTab === 'all' ? 'text-white' : 'text-text/30 hover:text-text/60'
           }`}
         >
           <div className="relative z-10 flex items-center gap-3">
             <ActivityIcon size={16} className={activeTab === 'all' ? 'text-accent' : ''} />
             Global Matrix
           </div>
           {activeTab === 'all' && (
             <motion.div layoutId="tab-bg" className="absolute bottom-0 left-0 w-full h-[3px] bg-accent" />
           )}
         </button>
        )}
        <button 
          onClick={() => setActiveTab('received')}
          className={`flex-1 flex items-center justify-center gap-3 py-6 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
            activeTab === 'received' ? 'text-white' : 'text-text/30 hover:text-text/60'
          }`}
        >
          <div className="relative z-10 flex items-center gap-3">
            <Inbox size={16} className={activeTab === 'received' ? 'text-accent' : ''} />
            Received
            {requests?.received && requests.received.filter(r => r.status === 'pending').length > 0 && (
                <span className="w-5 h-5 bg-accent text-white text-[8px] flex items-center justify-center rounded-full">
                    {requests.received.filter(r => r.status === 'pending').length}
                </span>
            )}
          </div>
          {activeTab === 'received' && (
            <motion.div layoutId="tab-bg" className="absolute bottom-0 left-0 w-full h-[3px] bg-accent" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('sent')}
          className={`flex-1 flex items-center justify-center gap-3 py-6 text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
            activeTab === 'sent' ? 'text-white' : 'text-text/30 hover:text-text/60'
          }`}
        >
          <div className="relative z-10 flex items-center gap-3">
            <Send size={16} className={activeTab === 'sent' ? 'text-accent' : ''} />
            Sent
          </div>
          {activeTab === 'sent' && (
            <motion.div layoutId="tab-bg" className="absolute bottom-0 left-0 w-full h-[3px] bg-accent" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {loading ? (
            <div className="py-32 flex flex-col items-center justify-center space-y-6">
                <div className="w-12 h-12 border-[4px] border-background border-t-accent animate-spin rounded-sm"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse">Working...</span>
            </div>
        ) : error ? (
            <div className="py-20 arch-card border-red-100 bg-red-50/20 text-center space-y-4">
                <XCircle size={32} className="mx-auto text-red-300" />
                <p className="text-[10px] font-black uppercase tracking-widest text-red-900">{error}</p>
            </div>
        ) : !currentData || currentData.length === 0 ? (
            <div className="py-32 arch-card border-dashed border-border flex flex-col items-center justify-center space-y-6 opacity-40 bg-primary/50">
                <div className="w-16 h-16 border border-border flex items-center justify-center bg-primary rotate-45">
                    <MessageSquare size={24} className="-rotate-45 text-white/20" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-white">No requests found</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text/40">Search for students to start collaborating.</p>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {currentData.map((req, idx) => (
                        <motion.div 
                            key={req.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="arch-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/40 transition-all duration-300 group shadow-sm hover:shadow-xl"
                        >
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="w-14 h-14 border border-border bg-background flex items-center justify-center font-black text-white group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 relative">
                                    <User size={20} />
                                    {isAdmin && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-accent flex items-center justify-center border border-accent/20">
                                            <ShieldCheck size={12} />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                                            {activeTab === 'all' ? (
                                                <span>{req.senderName} → {req.receiverName}</span>
                                            ) : (
                                                <span>{req.name}</span>
                                            )}
                                        </h3>
                                        {isAdmin && activeTab === 'all' && (
                                            <span className="text-[8px] font-black bg-primary text-accent px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">Platform Wide</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border flex items-center gap-2 ${getStatusStyle(req.status)}`}>
                                            {getStatusIcon(req.status)}
                                            {req.status}
                                        </span>
                                        <span className="text-[9px] font-bold text-text/30 uppercase tracking-widest flex items-center gap-1">
                                            <Clock size={10} /> {new Date(req.createdAt).toLocaleDateString()}
                                        </span>
                                        {req.skill && (
                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest border border-accent/20 px-2 py-0.5">
                                                {req.skill}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 w-full md:max-w-md bg-background/50 border border-border/50 p-4 relative">
                                <p className="text-[11px] font-medium text-text/70 leading-relaxed italic">
                                    "{req.message || 'No message attached.'}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                {activeTab === 'received' && req.status === 'pending' ? (
                                    <>
                                        <button 
                                            disabled={actionLoading === req.id}
                                            onClick={() => handleResponse(req.id, 'accepted')}
                                            className="flex-1 md:flex-none bg-primary text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50"
                                        >
                                            {actionLoading === req.id ? '...' : 'Approve'}
                                        </button>
                                        <button 
                                            disabled={actionLoading === req.id}
                                            onClick={() => handleResponse(req.id, 'rejected')}
                                            className="flex-1 md:flex-none border border-border text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 disabled:opacity-50"
                                        >
                                            Decline
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-2">
                                        {activeTab === 'all' ? 'Monitored' : 'Completed'} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}
      </div>
    </div>
  );
};

export default Collaboration;
