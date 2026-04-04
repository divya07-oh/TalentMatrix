import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Users, 
  FileText, 
  MessageSquare,
  Settings
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const { addToast } = useToast();
  const [progress, setProgress] = useState(25);
  const team = [
    { name: 'Alex Johnson', role: 'You (Dev)', college: 'Stanford' },
    { name: 'Michael Ross', role: 'Backend', college: 'MIT' },
    { name: 'Elena Gilbert', role: 'UI/UX', college: 'Oxford' },
  ];

  return (
    <div className="projects-container">
      <header className="content-header">
        <div>
          <h1>Project Workspace</h1>
          <p>Eco-Track Mobile App Collaboration</p>
        </div>
        <div className="project-actions">
          <button className="icon-btn-bordered"><MessageSquare size={18} /></button>
          <button className="icon-btn-bordered"><FileText size={18} /></button>
          <button className="icon-btn-bordered"><Settings size={18} /></button>
        </div>
      </header>

      <div className="project-main-grid">
        <div className="project-left-col">
          <section className="project-card">
            <h3>Project Description</h3>
            <p>
              Collaborative effort to build a cross-platform mobile application that tracks personal 
              carbon footprints in real-time. Integrating IoT sensors and public transportation APIs 
              to provide accurate emission data and sustainable lifestyle recommendations.
            </p>
          </section>

          <section className="project-card">
            <h3>Institutional Progress</h3>
            <div className="progress-input-section">
              <div className="input-field">
                <label>Current Completion (%)</label>
                <div className="progress-input-wrapper">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={(e) => setProgress(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  />
                  <span>%</span>
                </div>
              </div>
              
              <div className="progress-visual-wrapper">
                <div className="progress-track">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="progress-labels">
                  <span>DEPLOYED NODES: {progress}%</span>
                  <span>TARGET: 100%</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="project-right-col">
           <section className="project-card">
             <div className="card-header-icon">
               <Users size={20} className="text-secondary" />
               <h3>Team Members</h3>
             </div>
             <div className="team-list">
               {team.map(member => (
                 <div key={member.name} className="team-member">
                   <div className="avatar-xs">{member.name.split(' ').map(n=>n[0]).join('')}</div>
                   <div className="member-info">
                     <strong>{member.name}</strong>
                     <span>{member.role} • {member.college}</span>
                   </div>
                 </div>
               ))}
             </div>
           </section>

           <section className="project-card bg-primary-dark">
              <h3 style={{ color: 'var(--accent-color)' }}>Project SSI Boost</h3>
              <p style={{ color: 'white', opacity: 0.8, fontSize: '0.85rem' }}>
                Completing this project will increase your Skill Strength Index by +12 points.
              </p>
              <div className="boost-badge">+12</div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
