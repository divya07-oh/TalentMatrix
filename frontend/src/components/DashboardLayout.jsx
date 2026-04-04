import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="matrix-grid-overlay"></div>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area reveal-blueprint">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
