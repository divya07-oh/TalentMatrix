import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  UserCircle
} from 'lucide-react';

const AdminTopNavbar = () => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    
    switch (lastPart) {
      case 'dashboard': return 'Dashboard';
      case 'verification': return 'Skill Approval';
      case 'search': return 'Student Search';
      case 'analytics': return 'Insights';
      case 'settings': return 'Settings';
      case 'notifications': return 'Notifications';
      default: return 'Admin Menu';
    }
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="h-20 bg-background border-b border-accent/20 sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
      {/* Title Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-extrabold text-white uppercase tracking-tighter">
          {title}
        </h1>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <Link to="/admin/notifications" className="relative p-2 text-white hover:text-accent transition-colors group">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-white"></span>
          {/* Subtle Notification Badge Hover Info */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-primary border border-border shadow-xl p-4 hidden group-hover:block transition-all z-50">
            <p className="text-[10px] font-black uppercase text-white tracking-widest leading-relaxed">
              New Alerts Available
            </p>
          </div>
        </Link>

        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">System Admin</p>
            <p className="text-[9px] font-bold text-text/40 uppercase tracking-[0.2em] leading-tight">Master Node</p>
          </div>
          <div className="w-10 h-10 border-2 border-primary group-hover:border-accent transition-all overflow-hidden bg-background flex items-center justify-center p-1">
            <UserCircle size={28} className="text-white group-hover:text-accent" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopNavbar;
