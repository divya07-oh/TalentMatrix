import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import SkillSearch from './pages/SkillSearch';
import Collaboration from './pages/Collaboration';
import ProjectWorkspace from './pages/ProjectWorkspace';
import Notifications from './pages/Notifications';
import SkillVerification from './pages/SkillVerification';
import AdminInsights from './pages/AdminInsights';
import AdminSettings from './pages/AdminSettings';
import AdminNotifications from './pages/AdminNotifications';
import AdminSkillSearch from './pages/AdminSkillSearch';

function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Student Panel Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="skills" element={<SkillSearch />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="projects" element={<ProjectWorkspace />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<div className="p-8 text-white font-black uppercase tracking-[0.4em]">Student Population Control</div>} />
          <Route path="search" element={<AdminSkillSearch />} />
          <Route path="verification" element={<SkillVerification />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="analytics" element={<AdminInsights />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>

        {/* Catch-all Route for Debugging */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h1 className="text-4xl font-black text-white uppercase italic">404 - Node Not Found</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text/40">The requested protocol is not recognized by the matrix.</p>
            <a href="/" className="bg-primary text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent transition-all">
              Re-Establish Connection
            </a>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
