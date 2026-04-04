import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Shield, 
  X, 
  MessageSquare, 
  Star, 
  Zap, 
  User, 
  Trash2, 
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { 
  getCurrentUser, 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications 
} from '../utils/mockAuth';
import './NotificationPage.css';

const NotificationPage = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const currentUser = getCurrentUser();

  const fetchNotifs = () => {
    if (currentUser) {
      const notifs = getNotifications(currentUser.id, 'student');
      setNotifications(notifs);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, [currentUser]);

  const handleMarkRead = (id) => {
    markAsRead(id);
    fetchNotifs();
  };

  const handleMarkAllRead = () => {
    markAllAsRead(currentUser.id, 'student');
    fetchNotifs();
    addToast('All nodes marked as read.', 'success');
  };

  const handleClearAll = () => {
    clearAllNotifications(currentUser.id, 'student');
    fetchNotifs();
    addToast('Notification history purged.', 'info');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'shield': return <Shield size={18} />;
      case 'x': return <X size={18} />;
      case 'message': return <MessageSquare size={18} />;
      case 'star': return <Star size={18} />;
      case 'zap': return <Zap size={18} />;
      case 'user': return <User size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  return (
    <div className="notif-page-container">
      <header className="content-header">
        <div className="title-block">
          <h1>Notifications</h1>
          <p>Real-time status updates and collaboration requests</p>
        </div>
        <div className="header-actions">
          <button className="btn-matrix-secondary" onClick={handleMarkAllRead}>
            <CheckCircle2 size={18} />
            <span>Mark All Read</span>
          </button>
          <button className="btn-matrix-danger" onClick={handleClearAll}>
            <Trash2 size={18} />
            <span>Purge History</span>
          </button>
        </div>
      </header>

      <div className="notif-controls">
        <div className="filter-group">
          <Filter size={16} className="text-matrix-accent" />
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>ALL</button>
          <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>UNREAD</button>
          <button className={filter === 'status_update' ? 'active' : ''} onClick={() => setFilter('status_update')}>UPDATES</button>
          <button className={filter === 'collab_request' ? 'active' : ''} onClick={() => setFilter('collab_request')}>INTERCEPTS</button>
        </div>
      </div>

      <div className="notif-list-wrapper">
        <AnimatePresence mode='popLayout'>
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`notif-card ${!notif.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkRead(notif.id)}
              >
                <div className="notif-card-icon">
                  {getIcon(notif.iconType)}
                </div>
                <div className="notif-card-content">
                  <div className="notif-card-header">
                    <span className="notif-type">{notif.type.replace('_', ' ')}</span>
                    <span className="notif-time">
                      <Clock size={12} />
                      {new Date(notif.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="notif-message">{notif.message}</p>
                </div>
                {!notif.isRead && <div className="unread-dot"></div>}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state-notifs"
            >
              <Bell size={48} className="empty-icon" />
              <h3>NO_SIGNALS_DETECTED</h3>
              <p>Your institutional frequency is currently clean.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationPage;
