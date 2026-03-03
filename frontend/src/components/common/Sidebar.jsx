import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Users, PieChart, User, LogOut } from 'lucide-react';

const Sidebar = ({ role }) => {
    const menuItems = {
        student: [
            { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
            { name: 'Smart Search', path: '/search', icon: Search },
            { name: 'Collaboration', path: '/collaboration', icon: Users },
            { name: 'Profile', path: '/profile', icon: User },
        ],
        faculty: [
            { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
            { name: 'Post Requirement', path: '/post-requirement', icon: PieChart },
            { name: 'Collaboration', path: '/collaboration', icon: Users },
            { name: 'Smart Search', path: '/search', icon: Search },
            { name: 'Profile', path: '/profile', icon: User },
        ],
        admin: [
            { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
            { name: 'Analytics', path: '/analytics', icon: PieChart },
            { name: 'Smart Search', path: '/search', icon: Search },
            { name: 'Collaboration', path: '/collaboration', icon: Users },
            { name: 'Profile', path: '/profile', icon: User },
        ],
    };

    const navItems = menuItems[role] || menuItems.student;

    return (
        <aside className="w-[280px] h-screen bg-primary fixed left-0 top-0 flex flex-col z-50">
            <div className="p-8 flex items-center gap-3 border-b border-white/10 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-20">TM</div>
                <span className="text-white text-20 font-semibold tracking-tight">TalentMatrix <span className="text-accent underline decoration-2">EDU</span></span>
            </div>

            <nav className="flex-1 flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-item rounded-lg ${isActive ? 'sidebar-item-active' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={20} className={isActive ? 'text-accent' : 'text-white/70'} />
                                <span className="font-medium">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 mb-6">
                <button className="sidebar-item w-full rounded-lg text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-3">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
