import React from 'react';
import { 
  Users, 
  Award, 
  Share2, 
  Activity,
  ArrowUp,
  TrendingUp
} from 'lucide-react';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  const stats = [
    { label: 'Total Students', value: '12,482', icon: Users, trend: '+14%', color: '#1B4332' },
    { label: 'Verified Skills', value: '45,210', icon: Award, trend: '+8.5%', color: '#D4AF37' },
    { label: 'Active Projects', value: '1,204', icon: Activity, trend: '+22%', color: '#3A5A40' },
    { label: 'Cross-College', value: '845', icon: Share2, trend: '+45%', color: '#BC6C25' },
  ];

  return (
    <div className="analytics-container">
      <header className="content-header">
        <h1>Administrative Analytics</h1>
        <p>Real-time platform insights and collaboration metrics.</p>
      </header>

      <div className="analytics-stats-row">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="stat-overview-card glimmer-hover"
          >
            <div className="stat-icon-bg" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon color={stat.color} size={24} />
            </div>
            <div className="stat-data">
              <span className="label">{stat.label}</span>
              <div className="value-row">
                <h3>{stat.value}</h3>
                <span className="trend-text positive">
                   <ArrowUp size={14} />
                   {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="analytics-charts-grid">
        <section className="chart-card glimmer-hover">
          <div className="chart-header">
             <h3>Skill Distribution</h3>
             <TrendingUp size={18} color="var(--text-light)" />
          </div>
          <div className="chart-placeholder">
             {[
               { label: 'AI & ML', width: '85%', color: 'var(--matrix-accent)' },
               { label: 'Web Dev', width: '70%', color: 'var(--accent-color)' },
               { label: 'UI/UX', width: '45%', color: 'var(--matrix-accent)' }
             ].map((bar, i) => (
               <div key={i} className="bar-row">
                 <span className="bar-label">{bar.label}</span>
                 <div className="bar-outer">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: bar.width }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: [0.65, 0, 0.35, 1] }}
                     className="bar-inner" 
                     style={{ background: bar.color }}
                   ></motion.div>
                 </div>
               </div>
             ))}
          </div>
        </section>

        <section className="chart-card glimmer-hover">
           <div className="chart-header">
              <h3>Collaboration Activity</h3>
              <Activity size={18} color="var(--text-light)" />
           </div>
           <div className="chart-placeholder-line">
              <svg width="100%" height="150" viewBox="0 0 400 150">
                <motion.path 
                  d="M0,150 L50,120 L100,135 L150,80 L200,105 L250,40 L300,60 L350,20 L400,30" 
                  fill="none" 
                  stroke="var(--primary-color)" 
                  strokeWidth="3" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M0,150 L50,120 L100,135 L150,80 L200,105 L250,40 L300,60 L350,20 L400,30 V150 H0 Z" 
                  fill="var(--primary-color)" 
                  opacity="0.1" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 2 }}
                />
              </svg>
           </div>
           <div className="chart-footer">
             <div className="footer-item"><div className="dot primary"></div> Monthly Growth</div>
           </div>
        </section>
      </div>

      <section className="analytics-card table-section glimmer-hover">
         <h3>Recent Top Collaborations</h3>
         <div className="mini-table">
            <div className="th-row">
              <span>Project</span>
              <span>Colleges Involved</span>
              <span>Status</span>
            </div>
            <div className="tr-row">
              <span>Solar Grid AI</span>
              <span>MIT, Stanford</span>
              <span className="status-chip success">Active</span>
            </div>
            <div className="tr-row">
              <span>HealthSync VR</span>
              <span>IIT Delhi, UCLA</span>
              <span className="status-chip success">Active</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AdminAnalytics;
