import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  Globe, 
  Zap,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { adminAnalyticsData } from '../../utils/mockAdminData';
import './AdminAnalyticsPage.css';

const AdminAnalyticsPage = () => {
  const { addToast } = useToast();

  const handleDownload = () => {
    addToast('Generating analytics report...', 'info');
    
    // Skill Distribution Data
    const skillHeaders = ['Skill Category', 'Percentage'];
    const skillRows = adminAnalyticsData.skillDistribution.map(s => [s.label, `${s.value}%`]);
    
    // Top Requested Skills
    const topSkillsHeaders = ['Trending Skill'];
    const topSkillsRows = adminAnalyticsData.topRequestedSkills.map(s => [s]);
    
    // Combine into one CSV for simplicity
    const csvContent = [
      ['SECTION: SKILL DISTRIBUTION'],
      skillHeaders,
      ...skillRows,
      [''],
      ['SECTION: TRENDING SKILLS'],
      topSkillsHeaders,
      ...topSkillsRows,
      [''],
      ['SECTION: SYSTEM STATS'],
      ['Active Users', '128'],
      ['Ongoing Projects', '3,120']
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `TalentMatrix_Insights_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      addToast('Analytics report downloaded successfully.', 'success');
    }, 1200);
  };

  return (
    <div className="analytics-page-container">
      <header className="management-header">
        <div className="admin-title-section">
          <h1>Insights</h1>
          <p>Simple stats on skills and student teamwork.</p>
        </div>
        <div className="admin-actions">
           <button className="btn-matrix-ghost" onClick={handleDownload}>
             <TrendingUp size={18} />
             <span>Download Report</span>
           </button>
        </div>
      </header>

      <div className="charts-row-top">
        <section className="chart-card-full glimmer-hover">
          <div className="chart-header-v2">
            <h3><PieChart size={24} className="text-matrix-accent" /> Top Skills</h3>
            <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">Global Stats</span>
          </div>
          <div className="pie-chart-container">
            <div className="relative w-56 h-56 rounded-full border-[12px] border-matrix-border flex items-center justify-center">
               <motion.div 
                 initial={{ rotate: -90, opacity: 0 }}
                 animate={{ rotate: 0, opacity: 1 }}
                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute inset-0 rounded-full border-[12px] border-matrix-accent border-t-transparent border-l-transparent"
               ></motion.div>
               <div className="text-center">
                 <span className="text-4xl font-black block">2.4k</span>
                 <span className="font-mono text-[10px] uppercase opacity-50 tracking-widest">Total Skills</span>
               </div>
            </div>
          </div>
          <div className="pie-legend">
            {adminAnalyticsData.skillDistribution.map(item => (
              <div key={item.label} className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                <span className="flex-1 opacity-70">{item.label}</span>
                <span className="font-black text-matrix-accent">{item.value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-card-full glimmer-hover">
          <div className="chart-header-v2">
            <h3><TrendingUp size={24} className="text-matrix-accent" /> Teamwork Growth</h3>
            <div className="flex gap-2">
               <span className="font-mono text-matrix-accent text-[10px] border border-matrix-border px-2 py-1 uppercase tracking-widest">+24% growth</span>
            </div>
          </div>
          <div className="line-chart-v">
            <svg width="100%" height="220" viewBox="0 0 800 250" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="line-path-anim"
                d="M0,200 C50,180 100,220 150,150 C200,80 250,120 300,60 C350,20 400,80 450,110 C500,140 550,40 600,60 C650,80 700,20 750,40 L800,30" 
                fill="none"
              />
            </svg>
          </div>
          <div className="data-summary-box">
             <div className="summary-item-v">
                <span className="s-val">842</span>
                <span className="s-lbl">New Collabs</span>
             </div>
             <div className="summary-item-v">
                <span className="s-val">12.5k</span>
                <span className="s-lbl">Interactions</span>
             </div>
             <div className="summary-item-v">
                <span className="s-val">1.2m</span>
                <span className="s-lbl">Credits</span>
             </div>
          </div>
        </section>
      </div>

      <div className="charts-row-bottom">
         <section className="chart-card-full glimmer-hover">
            <div className="chart-header-v2">
              <h3><BarChart3 size={24} className="text-matrix-accent" /> Daily Activity</h3>
              <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} className="text-matrix-accent" />
                Live Update
              </p>
            </div>
            <div className="simulated-bars">
               {adminAnalyticsData.activeStudentsByDay.map((val, i) => (
                 <div key={i} className="sim-bar-column">
                    <motion.div 
                      className="bar-visual" 
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / 1000) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    ></motion.div>
                    <span className="bar-label-v">T-{7-i}D</span>
                 </div>
               ))}
            </div>
         </section>

         <section className="chart-card-full">
            <div className="chart-header-v2">
              <h3><Globe size={24} className="text-matrix-accent" /> System Stats</h3>
            </div>
            <div className="flex flex-col gap-8 justify-center flex-1">
               <div className="flex items-center justify-between border-b border-matrix-border pb-6">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">Active Users</span>
                  <span className="text-4xl font-black">128</span>
               </div>
               <div className="flex items-center justify-between border-b border-matrix-border pb-6">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">Ongoing Projects</span>
                  <span className="text-4xl font-black">3,120</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">Platform Rank</span>
                  <div className="flex items-center gap-2 text-matrix-accent">
                    <ArrowUpRight size={24} />
                    <span className="text-2xl font-black uppercase">Top 5%</span>
                  </div>
               </div>
            </div>
            <button className="btn-matrix-primary w-full mt-10">
              VIEW SYSTEM MAP
            </button>
         </section>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
