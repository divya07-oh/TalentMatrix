import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopNavbar from '../components/admin/AdminTopNavbar';

const AdminLayout = () => {
  return (
    <div className="flex bg-background min-h-screen text-text selection:bg-accent selection:text-white font-sans overflow-x-hidden">
      {/* Sidebar - Fixed Position 260px */}
      <AdminSidebar />
      
      {/* Main Administrative Sector */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Subtle Background Aesthetic Overlay */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>

        {/* Top Navbar Sector */}
        <AdminTopNavbar />

        {/* Dynamic Content Sector */}
        <main className="flex-1 p-10 relative z-10 animate-fade-in overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto space-y-10 min-h-[calc(100vh-200px)]">
             <React.Suspense fallback={<div className="p-8 text-[10px] font-black uppercase text-accent animate-pulse tracking-[0.5em]">Loading Subsystem...</div>}>
                <Outlet />
             </React.Suspense>
          </div>
        </main>

        {/* Bottom Status bar Aesthetic */}
        <footer className="h-10 bg-primary border-t border-border flex items-center justify-between px-10 relative z-20 shadow-inner">
           <div className="flex items-center gap-6">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30">System Status: Optimal</span>
              <div className="w-[1px] h-3 bg-border"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30">Security Level: Master</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text/20">Version 1.0.0-Beta-Node-4</span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_5px_rgba(212,175,55,0.8)]"></div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
