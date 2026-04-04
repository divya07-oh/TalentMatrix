import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Github, 
  FileText, 
  Award, 
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { getAllPendingSkills, updateSkillStatus } from '../../utils/mockAuth';
import { pendingVerifications } from '../../utils/mockAdminData';
import './SkillVerification.css';

const SkillVerification = () => {
  const { addToast } = useToast();
  const [verifications, setVerifications] = useState(pendingVerifications.map(v => ({
    ...v,
    status: 'pending',
    timestamp: new Date(v.date).toISOString()
  })));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Merge with any real submissions from localStorage
    const pending = getAllPendingSkills();
    if (pending.length > 0) {
      setVerifications(prev => {
        const existingIds = prev.map(v => v.id);
        const newOnes = pending.filter(p => !existingIds.includes(p.id));
        return [...newOnes, ...prev];
      });
    }
  }, []);

  const loadVerifications = () => {
    const pending = getAllPendingSkills();
    setVerifications(prev => {
      const mockIds = ['v1', 'v2', 'v3'];
      const mocks = prev.filter(v => mockIds.includes(v.id));
      const existingIds = mocks.map(v => v.id);
      const newOnes = pending.filter(p => !existingIds.includes(p.id));
      return [...newOnes, ...mocks];
    });
  };

  const handleApprove = (id, skill) => {
    updateSkillStatus(id, 'verified');
    addToast(`Approved ${skill}! Skill added to student profile.`, 'success');
    loadVerifications();
  };

  const handleReject = (id, skill) => {
    updateSkillStatus(id, 'rejected');
    addToast(`Rejected ${skill}. Notification sent to student.`, 'error');
    loadVerifications();
  };

  return (
    <div className="verification-container">
      <header className="management-header">
        <div className="admin-title-section">
          <h1>Check Skills</h1>
          <p>Review student skills and their proof of work.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="stat-card accent py-4 px-6 flex items-center gap-3" style={{ background: 'var(--matrix-grid)', padding: '1rem 2rem' }}>
            <Clock size={18} className="text-matrix-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-matrix-accent">{verifications.length} Items to Check</span>
          </div>
        </div>
      </header>

      {verifications.length > 0 ? (
        <div className="verification-grid">
          <AnimatePresence mode="popLayout">
            {verifications.map((v, i) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="verification-card glimmer-hover"
              >
                <div className="card-header-v" style={{ borderBottom: '1px solid var(--matrix-border)', paddingBottom: '1.5rem' }}>
                  <div className="v-student-info">
                    <span className="v-student-name">{v.studentName || v.userEmail || 'Student'}</span>
                    <span className="v-timestamp">SUBMITTED ON {new Date(v.timestamp).toLocaleDateString()}</span>
                  </div>
                  <span className="v-skill-badge">Check Needed</span>
                </div>

                <div className="v-skill-content">
                  <h4 className="flex items-center gap-3">
                    <Award size={24} className="text-matrix-accent" />
                    {v.skill || v.name}
                  </h4>
                  <div className="v-proof-box">
                    <a href={v.proof} target="_blank" rel="noopener noreferrer" className="v-proof-info no-underline hover:opacity-80 transition-opacity">
                      {v.proofType === 'GitHub' ? <Github className="proof-icon" size={18} /> : <FileText className="proof-icon" size={18} />}
                      <div>
                        <span className="proof-type">{v.proofType || 'Proof of Work'}</span>
                        <p className="font-mono text-[10px] opacity-40 uppercase tracking-tighter">ID: {v.id.toUpperCase()}</p>
                      </div>
                      <ExternalLink size={14} className="ml-auto opacity-40" />
                    </a>
                  </div>
                </div>

                <div className="v-actions-row">
                  <button 
                    className="v-btn v-btn-reject"
                    onClick={() => handleReject(v.id, v.name)}
                  >
                    <XCircle size={18} />
                    <span>Reject</span>
                  </button>
                  <button 
                    className="v-btn v-btn-approve"
                    onClick={() => handleApprove(v.id, v.name)}
                  >
                    <CheckCircle size={18} />
                    <span>Approve</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="empty-state-v">
          <CheckCircle size={64} className="text-matrix-accent opacity-50" />
          <div className="text-center">
            <h3>Everything is up to date!</h3>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-40 mt-2">No skills waiting for approval</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillVerification;
