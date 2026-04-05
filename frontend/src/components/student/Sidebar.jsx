import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  Search, 
  Users, 
  Layers, 
  Bell 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/student/dashboard' },
    { title: 'Profile', icon: <UserCircle size={20} />, path: '/student/profile' },
    { title: 'Skill Search', icon: <Search size={20} />, path: '/student/skills' },
    { title: 'Collaboration', icon: <Users size={20} />, path: '/student/collaboration' },
    { title: 'Projects', icon: <Layers size={20} />, path: '/student/projects' },
  ];

  return (
    <aside className="w-64 bg-secondary text-white h-screen fixed left-0 top-0 hidden lg:flex flex-col border-r border-white/5 z-40 shadow-2xl shadow-secondary/30">
      {/* Sidebar Header */}
      <div className="p-8 border-b border-white/5 mb-6 bg-secondary/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-12 ring-2 ring-accent/20">
            <span className="text-white font-black text-xl tracking-tighter">TM</span>
          </div>
          <span className="text-lg font-black uppercase tracking-[0.2em] leading-none">
            Talent<br />Matrix
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
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
                 <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                   {item.icon}
                 </span>
                 <span className="relative z-10">{item.title}</span>
                 {/* Active Aesthetic Indicator */}
                 {isActive && (
                    <div className="absolute right-0 top-0 h-full w-[3px] bg-accent/40 shadow-[0_0_15px_rgba(212,175,55,0.8)] opacity-0"></div>
                 )}
               </>
             )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-8 border-t border-white/5 bg-secondary/80 shadow-inner">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-black uppercase text-white/40 tracking-[0.4em] mb-2">Version 2.0.4</div>
          <button 
             onClick={handleLogout}
             className="btn btn-secondary font-black uppercase tracking-widest leading-none"
          >
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
