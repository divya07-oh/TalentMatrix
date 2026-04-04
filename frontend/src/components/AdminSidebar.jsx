import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const adminMenuItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard, end: true },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Check Skills', path: '/admin/verify-skills', icon: CheckSquare },
    { name: 'Insights', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userCollege');
    addToast('Admin logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-logo-icon">A</div>
        <div className="admin-logo-text">
          Admin<span>Panel</span>
          <span className="admin-badge">Management</span>
        </div>
      </div>
      
      <nav className="admin-nav">
        <div className="nav-group-label">General</div>
        {adminMenuItems.slice(0, 2).map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            end={item.end}
            className={({ isActive }) => `admin-nav-item glimmer-hover ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}

        <div className="nav-group-label mt-8">Actions</div>
        {adminMenuItems.slice(2).map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            end={item.end}
            className={({ isActive }) => `admin-nav-item glimmer-hover ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
