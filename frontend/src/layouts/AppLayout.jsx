import React from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNavbar from '../components/common/TopNavbar';

const AppLayout = ({ children, title, role }) => {
  return (
    <div className="min-h-screen bg-lightbg font-sans antialiased flex">
      <Sidebar role={role} />
      <div className="flex-1 ml-[280px]">
        <TopNavbar title={title} />
        <main className="p-32 pt-[112px]">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;