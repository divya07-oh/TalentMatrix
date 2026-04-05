import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Layers, 
  Settings, 
  Bell, 
  UserCircle,
  ChevronRight,
  LogOut,
  Search
} from 'lucide-react';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { title: 'Student Search', icon: <Search size={20} />, path: '/admin/search' },
    { title: 'Skill Approval', icon: <CheckCircle2 size={20} />, path: '/admin/verification' },
    { title: 'Insights', icon: <Layers size={20} />, path: '/admin/analytics' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-secondary text-white h-screen fixed left-0 top-0 hidden lg:flex flex-col border-r border-white/5 z-40 shadow-2xl shadow-secondary/30">
      {/* Sidebar Header */}
      <div className="p-8 border-b border-white/5 mb-6 bg-secondary/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-12 ring-2 ring-accent/20">
            <UserCircle className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-[0.3em] leading-none text-white">
              Talent
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none text-accent">
              Management
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="px-4 mb-4">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Main Menu</span>
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 relative group overflow-hidden
              ${isActive ? 'text-accent bg-primary/5 border-l-4 border-accent shadow-[inset_4px_0_0_0_rgba(212,175,55,1)] rounded-r-md' : 'text-white/60 hover:text-white hover:bg-primary/5 border-l-4 border-transparent rounded-md'}
            `}
          >
             {({ isActive }) => (
               <>
                 <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110 text-accent' : ''}`}>
                   {item.icon}
                 </span>
                 <span className="relative z-10">{item.title}</span>
                 
                 {/* Active Aesthetic Indicator */}
                 {isActive && (
                    <div className="absolute right-0 top-0 h-full w-[3px] bg-accent/40 shadow-[0_0_15px_rgba(212,175,55,0.8)] opacity-0"></div>
                 )}
                 
                 <ChevronRight 
                    size={14} 
                    className={`ml-auto transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} 
                 />
               </>
             )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-8 border-t border-white/5 bg-secondary/80 shadow-inner">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-sm border border-white/5">
             <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-black text-xs">
                AD
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-white truncate max-w-[100px]">System Admin</span>
                <span className="text-[8px] font-black uppercase text-accent tracking-widest">Administrator</span>
             </div>
          </div>
          <button onClick={handleLogout} className="btn btn-danger flex items-center justify-center gap-3 p-3 font-black uppercase tracking-[0.3em]">
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
