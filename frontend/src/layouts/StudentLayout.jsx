import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/student/Sidebar';
import TopNavbar from '../components/student/TopNavbar';

const StudentLayout = () => {
  return (
    <div className="flex bg-background min-h-screen text-white selection:bg-accent selection:text-black font-sans overflow-x-hidden">
      {/* Sidebar - Fixed Position 260px */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Structural Blueprint Grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none"></div>

        {/* Top Navbar Section */}
        <TopNavbar />

        {/* Dynamic Content Sector */}
        <main className="flex-1 p-12 relative z-10 animate-fade-in overflow-y-auto custom-scrollbar">
          <div className="max-w-screen-2xl mx-auto min-h-[calc(100vh-120px)]">
             <React.Suspense fallback={<div className="p-8 text-[10px] font-black uppercase text-accent animate-pulse tracking-[0.5em]">Synchronizing Matrix...</div>}>
                <Outlet />
             </React.Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
