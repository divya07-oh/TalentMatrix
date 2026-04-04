import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="matrix-grid-overlay"></div>
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminNavbar />
        <main className="admin-content-area reveal-blueprint">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
