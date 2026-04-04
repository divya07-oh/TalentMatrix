import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  User, 
  Zap, 
  MessageSquare, 
  AlertCircle,
  Clock,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { getNotifications, markAsRead } from '../utils/mockAuth';
import './Navbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const collegeId = localStorage.getItem('userCollege') || 'Institution';

  useEffect(() => {
    const fetchNotifs = () => {
      const notifs = getNotifications(null, 'admin');
      setNotifications(notifs);
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 5000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userCollege');
    addToast('Admin logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <div className="admin-breadcrumb">
        <ShieldCheck className="text-matrix-accent" size={18} />
        <span className="breadcrumb-text">
          {collegeId.replace('-', ' ')} Admin
        </span>
      </div>

      <div className="navbar-actions">
        <div className="notification-wrapper">
          <button 
            className="icon-btn relative" 
            onClick={() => navigate('/admin/notifications')}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
        </div>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">College Admin</span>
            <span className="user-role">System Administrator</span>
          </div>
          <div className="avatar bg-matrix-accent text-secondary-color">AD</div>
        </div>

        <button className="icon-btn logout-nav-btn" onClick={handleLogout} title="Logout">
          <LogOut size={20} className="text-matrix-accent" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
