import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Award, 
  Briefcase, 
  User, 
  Github, 
  FileText, 
  Upload, 
  X,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { getCurrentUser } from '../utils/mockAuth';
import './ProfilePage.css';

const ProfilePage = () => {
  const { addToast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [skills, setSkills] = useState(['Python', 'React', 'Data Science', 'Machine Learning']);
  const [newSkill, setNewSkill] = useState('');
  const [gitRepos, setGitRepos] = useState(['https://github.com/alexj/eco-track', 'https://github.com/alexj/matrix-auth']);
  const [certFile, setCertFile] = useState(null);
  
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    college: 'University of Technology',
    department: 'Computer Science',
    year: '3rd Year'
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSave = () => {
    addToast('Institutional identity synchronized.', 'success');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      addToast('Technical node initialized.', 'success');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
    addToast('Technical node detached.', 'info');
  };

  const addRepoNode = () => {
    setGitRepos([...gitRepos, '']);
    addToast('New repository node added.', 'success');
  };

  const updateRepoNode = (index, value) => {
    const updated = [...gitRepos];
    updated[index] = value;
    setGitRepos(updated);
  };

  const removeRepoNode = (index) => {
    setGitRepos(gitRepos.filter((_, i) => i !== index));
    addToast('Repository node purged.', 'error');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCertFile(e.target.files[0]);
      addToast('Certification hash uploaded.', 'success');
    }
  };

  return (
    <div className="profile-container reveal-blueprint">
      <div className="matrix-grid-overlay"></div>
      
      <header className="content-header">
        <div className="header-badge">STU_MODE_88_V2</div>
        <div className="title-block">
          <h1>Institutional Identity</h1>
          <p>Global node management for <strong>{profileData.fullName}</strong></p>
        </div>
        <button className="btn-matrix-primary sync-btn" onClick={handleSave}>
          <Save size={18} />
          <span>Sync Identity</span>
        </button>
      </header>

      <div className="profile-blueprint-grid">
        {/* Basic Info - Main Perspective */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="blueprint-card info-node"
        >
          <div className="node-header">
            <User className="node-icon" size={20} />
            <h3>Basic Node Identification</h3>
          </div>
          <div className="form-grid-blueprint">
            <div className="input-field-blueprint">
              <label>Registry Name</label>
              <input 
                type="text" 
                value={profileData.fullName} 
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
              />
            </div>
            <div className="input-field-blueprint disabled">
              <label>Domain Authority</label>
              <div className="status-input">
                <Globe size={14} className="accent" />
                <input type="text" value={profileData.college} disabled />
              </div>
            </div>
            <div className="input-field-blueprint">
              <label>Department Vector</label>
              <input 
                type="text" 
                value={profileData.department} 
                onChange={(e) => setProfileData({...profileData, department: e.target.value})}
              />
            </div>
            <div className="input-field-blueprint">
              <label>Cohort Cycle</label>
              <select 
                value={profileData.year}
                onChange={(e) => setProfileData({...profileData, year: e.target.value})}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* Technical Expertise - Skills */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="blueprint-card skill-node"
        >
          <div className="node-header">
            <Zap className="node-icon" size={20} />
            <h3>Technical Expertise Nodes</h3>
          </div>
          
          <form className="node-input-row" onSubmit={handleAddSkill}>
            <input 
              type="text" 
              placeholder="INIT_SKILL_SEQUENCE..." 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button type="submit" className="node-plus-btn">
              <Plus size={16} />
            </button>
          </form>

          <div className="node-tags-cloud">
            <AnimatePresence>
              {skills.map(skill => (
                <motion.div 
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="institutional-tag"
                >
                  <span>{skill}</span>
                  <X size={12} className="tag-del" onClick={() => removeSkill(skill)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Git Repo Nodes */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="blueprint-card git-node"
        >
          <div className="node-header">
            <Github className="node-icon" size={20} />
            <h3>Repository Logic</h3>
            <button className="node-plus-btn" onClick={addRepoNode}>
              <Plus size={16} />
            </button>
          </div>
          
          <div className="repo-list">
            <AnimatePresence>
              {gitRepos.map((repo, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="repo-node-input"
                >
                  <div className="repo-index">{(idx + 1).toString().padStart(2, '0')}</div>
                  <input 
                    type="text" 
                    value={repo} 
                    placeholder="https://github.com/..."
                    onChange={(e) => updateRepoNode(idx, e.target.value)}
                  />
                  <button className="repo-del-btn" onClick={() => removeRepoNode(idx)}>
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Certifications - Bottom Horizontal */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="blueprint-card cert-node"
        >
          <div className="node-header">
            <ShieldCheck className="node-icon" size={20} />
            <h3>Validation Signatures</h3>
          </div>
          
          <div className="node-upload-blueprint">
            {!certFile ? (
              <label className="blueprint-upload-label">
                <Upload size={24} />
                <div className="upload-meta">
                  <span className="primary">Upload Validation Evidence</span>
                  <span className="secondary">Institutional hash required (PDF/IMG)</span>
                </div>
                <input type="file" onChange={handleFileChange} hidden />
              </label>
            ) : (
              <div className="node-file-manifest">
                <FileText size={24} className="manifest-icon" />
                <div className="manifest-info">
                  <span className="m-name">{certFile.name}</span>
                  <span className="m-size">HASH_ALLOCATION: {(certFile.size / 1024).toFixed(1)} KB</span>
                </div>
                <button className="manifest-purge" onClick={() => setCertFile(null)}>
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProfilePage;
