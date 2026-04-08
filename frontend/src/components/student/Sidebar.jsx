import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  Search, 
  Users, 
  Layers, 
  Bell,
  LogOut
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
    <aside className="w-64 bg-secondary text-white h-screen fixed left-0 top-0 hidden lg:flex flex-col border-r border-border z-40">
      {/* Sidebar Header */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-4 group">
          <div className="logo-box">T</div>
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-[0.4em] leading-tight text-white group-hover:text-accent transition-colors">
              Talent
            </span>
            <span className="text-xl font-black uppercase tracking-[0.2em] leading-tight text-white group-hover:text-accent transition-colors">
              Matrix
            </span>
            <div className="mt-1 px-2 py-0.5 bg-white/5 border border-white/10 self-start">
               <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/40">Student Node</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-6 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Main Sector */}
        <div className="space-y-4">
           <div className="px-2">
              <span className="text-premium-muted">Main</span>
           </div>
           <div className="space-y-1">
              {[
                { title: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/student/dashboard' },
                { title: 'Profile', icon: <UserCircle size={18} />, path: '/student/profile' },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative group
                    ${isActive ? 'text-accent border-l-2 border-accent' : 'text-white/40 hover:text-white border-l-2 border-transparent'}
                  `}
                >
                  <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              ))}
           </div>
        </div>

        {/* Explore Sector */}
        <div className="space-y-4">
           <div className="px-2">
              <span className="text-premium-muted">Explore</span>
           </div>
           <div className="space-y-1">
              {[
                { title: 'Skill Search', icon: <Search size={18} />, path: '/student/skills' },
                { title: 'Collaboration', icon: <Users size={18} />, path: '/student/collaboration' },
                { title: 'Projects', icon: <Layers size={18} />, path: '/student/projects' },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative group
                    ${isActive ? 'text-accent border-l-2 border-accent' : 'text-white/40 hover:text-white border-l-2 border-transparent'}
                  `}
                >
                  <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              ))}
           </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-8 border-t border-border bg-black/20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 border border-white/5 rounded-sm bg-white/[0.02]">
             <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center font-black text-[10px]">
                JD
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-white tracking-widest">John Doe</span>
                <span className="text-[7px] font-bold uppercase text-white/30 tracking-widest">Student</span>
             </div>
             <button onClick={handleLogout} className="ml-auto text-white/30 hover:text-red-500 transition-colors">
                <LogOut size={16} />
             </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
