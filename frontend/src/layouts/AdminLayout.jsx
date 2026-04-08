import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopNavbar from '../components/admin/AdminTopNavbar';

const AdminLayout = () => {
  return (
    <div className="flex bg-background min-h-screen text-white selection:bg-accent selection:text-black font-sans overflow-x-hidden">
      {/* Sidebar - Fixed Position 260px */}
      <AdminSidebar />
      
      {/* Main Administrative Sector */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Structural Blueprint Grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none"></div>

        {/* Top Navbar Sector */}
        <AdminTopNavbar />

        {/* Dynamic Content Sector */}
        <main className="flex-1 p-12 relative z-10 animate-fade-in overflow-y-auto custom-scrollbar">
          <div className="max-w-screen-2xl mx-auto min-h-[calc(100vh-160px)]">
             <React.Suspense fallback={<div className="p-8 text-[10px] font-black uppercase text-accent animate-pulse tracking-[0.5em]">Establishing Connection...</div>}>
                <Outlet />
             </React.Suspense>
          </div>
        </main>

        {/* Minimalist Status Bar */}
        <footer className="h-12 bg-primary/50 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-12 relative z-20">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_theme('colors.accent')]"></div>
                 <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">System Status / Optimal</span>
              </div>
              <div className="w-[1px] h-3 bg-white/10"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Node-Alpha-4</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/10">TalentMatrix OS v1.0.4</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
