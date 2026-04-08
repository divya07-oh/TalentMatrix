import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  UserCircle,
  LogOut
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
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 flex items-center justify-between px-10">
      {/* Title / Breadcrumb Section */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
          Stanford <span className="text-white/40">/ {title}</span>
        </h1>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        <Link to="/admin/notifications" className="relative text-white/50 hover:text-accent transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </Link>

        {/* Profile Snippet */}
        <div className="flex items-center gap-4 pl-8 border-l border-white/5 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">College Admin</p>
            <p className="text-[8px] font-bold text-accent uppercase tracking-[0.2em] mt-1 leading-tight">System Administrator</p>
          </div>
          <div className="w-10 h-10 bg-accent text-black flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopNavbar;
