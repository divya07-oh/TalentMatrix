import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { mockStudents, pendingVerifications, adminAnalyticsData } from '../../utils/mockAdminData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const stats = [
    { label: 'Total Students', value: mockStudents.length.toString(), icon: Users, color: '#D4AF37', trend: '+12%', up: true },
    { label: 'Skills Verified', value: '1,284', icon: Award, color: '#D4AF37', trend: '+8.5%', up: true },
    { label: 'Active Collabs', value: '42', icon: Zap, color: '#D4AF37', trend: '+15%', up: true },
    { label: 'Pending Verifications', value: pendingVerifications.length.toString(), icon: Clock, color: '#D4AF37', trend: '-2%', up: false },
  ];

  const recentActivity = [
    { type: 'verification', user: 'James Wilson', action: 'submitted a new skill: React Architecture', time: '2 mins ago', avatar: 'JW' },
    { type: 'signup', user: 'Elena Rodriguez', action: 'joined from MIT', time: '15 mins ago', avatar: 'ER' },
    { type: 'collab', user: 'Sarah Chen', action: 'started a new collaboration with Arjun Mehta', time: '1 hour ago', avatar: 'SC' },
    { type: 'skill', user: 'Liam O\'Brien', action: 'verified as Top Talent in Data Science', time: '3 hours ago', avatar: 'LO' },
  ];

  const handleDownload = () => {
    addToast('Preparing dashboard stats for download...', 'info');
    
    // Generate simple CSV
    const headers = ['Metric', 'Value', 'Trend'];
    const rows = stats.map(s => [s.label, s.value, s.trend]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "TalentMatrix_Stats_Summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      addToast('Dashboard stats downloaded successfully.', 'success');
    }, 1000);
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header-row">
        <div className="admin-title-section">
          <h1>Dashboard</h1>
          <p>See how your students and skills are growing.</p>
        </div>
        <div className="admin-actions">
          <button className="btn-matrix-primary" onClick={handleDownload}>
            <ShieldCheck size={18} />
            <span>Download Stats</span>
          </button>
        </div>
      </header>

      <div className="admin-stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="admin-stat-card glimmer-hover"
          >
            <div className="stat-icon-wrapper">
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <div className={`stat-trend ${stat.up ? 'up' : 'down'}`}>
                {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <section className="admin-panel-card">
          <div className="panel-header">
            <h3>Recent Activity Feed</h3>
            <button className="btn-view-all highlight-matrix" onClick={() => navigate('/admin/notifications')}>
              View All Logs <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="activity-item"
              >
                <div className="activity-avatar">{activity.avatar}</div>
                <div className="activity-content">
                  <p><strong>{activity.user}</strong> {activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="item-status">
                  {activity.type === 'verification' && <Clock size={18} className="text-matrix-accent opacity-60" />}
                  {activity.type === 'skill' && <CheckCircle2 size={18} className="text-matrix-accent" />}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="admin-panel-card">
          <div className="panel-header">
            <h3>Top Trending Skills</h3>
          </div>
          <div className="top-skills-list">
            {adminAnalyticsData.topRequestedSkills.map((skill, i) => (
              <motion.div 
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                className="skill-rank-item"
              >
                <div className="skill-name-group">
                  <span className="rank-number">0{i + 1}</span>
                  <span className="skill-name">{skill}</span>
                </div>
                <div className="skill-visual-bar">
                   <div className="bar-fill" style={{ width: `${85 - i * 15}%` }}></div>
                </div>
                <span className="skill-count">{85 - i * 12} Users</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
