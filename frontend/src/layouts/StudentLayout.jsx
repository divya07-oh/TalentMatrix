import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/student/Sidebar';
import TopNavbar from '../components/student/TopNavbar';

const StudentLayout = () => {
  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar - Fixed 260px provided by w-64 effectively */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
        <TopNavbar />
        <main className="flex-1 p-8 overflow-y-auto min-h-[calc(100vh-80px)]">
           <React.Suspense fallback={<div className="p-8 text-[10px] font-black uppercase text-accent animate-pulse tracking-[0.5em]">Syncing Matrix...</div>}>
              <Outlet />
           </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
