import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  Zap, 
  MessageSquare, 
  Trash2, 
  CheckCircle2,
  Clock,
  Filter,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications 
} from '../../utils/mockAuth';
import './AdminNotifications.css';

const AdminNotifications = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotifs = () => {
    const notifs = getNotifications(null, 'admin');
    setNotifications(notifs);
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkRead = (id) => {
    markAsRead(id);
    fetchNotifs();
  };

  const handleMarkAllRead = () => {
    markAllAsRead(null, 'admin');
    fetchNotifs();
    addToast('All marked as read.', 'success');
  };

  const handleClearAll = () => {
    clearAllNotifications(null, 'admin');
    fetchNotifs();
    addToast('All activity cleared.', 'info');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'registration': return <User size={18} />;
      case 'skill_submission': return <Zap size={18} />;
      case 'collab_request': return <MessageSquare size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const filteredNotifs = notifications.filter(n => {
    const matchesFilter = filter === 'all' || n.type === filter;
    const matchesSearch = n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-notif-container">
      <header className="content-header">
        <div className="title-block">
          <div className="admin-badge">Notifications</div>
          <h1>Updates</h1>
          <p>Recent updates from students.</p>
        </div>
        <div className="header-actions">
          <button className="btn-matrix-secondary" onClick={handleMarkAllRead}>
            <CheckCircle2 size={18} />
            <span>Mark All Read</span>
          </button>
          <button className="btn-matrix-danger" onClick={handleClearAll}>
            <Trash2 size={18} />
            <span>Clear All</span>
          </button>
        </div>
      </header>

      <div className="admin-notif-tools">
        <div className="search-bar-blueprint">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search updates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="admin-filter-group">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'registration' ? 'active' : ''} onClick={() => setFilter('registration')}>Signups</button>
          <button className={filter === 'skill_submission' ? 'active' : ''} onClick={() => setFilter('skill_submission')}>Skills</button>
        </div>
      </div>

      <div className="admin-log-list">
        <AnimatePresence mode='popLayout'>
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`admin-log-card ${!notif.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkRead(notif.id)}
              >
                <div className="log-status-indicator"></div>
                <div className="log-icon">
                  {getIcon(notif.type)}
                </div>
                <div className="log-body">
                  <div className="log-meta">
                    <span className="log-type">{notif.type.replace('_', ' ')}</span>
                    <span className="log-time">
                      <Clock size={12} />
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="log-message">{notif.message}</p>
                </div>
                {!notif.isRead && (
                  <div className="new-tag">NEW</div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="empty-log-state">
              <ShieldCheck size={64} className="shield-icon" />
              <h3>No new updates</h3>
              <p>Everything is quiet.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminNotifications;
