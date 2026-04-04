import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  Bell, 
  Save, 
  Camera,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import './CollegeSettings.css';

const CollegeSettings = () => {
  const { addToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const collegeId = localStorage.getItem('userCollege') || 'stanford';

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast('Settings saved successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="settings-container">
      <header className="management-header">
        <div className="admin-title-section">
          <h1>Settings</h1>
          <p>Update your college's information and preferences.</p>
        </div>
        <button 
          className="btn-matrix-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save size={18} />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </header>

      <section className="settings-section-card reveal-blueprint">
        <div className="settings-section-header">
          <h3><Building2 size={24} className="text-matrix-accent" /> College Profile</h3>
          <p>Visible to students and partners on the platform.</p>
        </div>
        
        <div className="profile-setup-row">
           <div className="admin-avatar-lg">
              {collegeId[0].toUpperCase()}
              <div className="avatar-edit-badge"><Camera size={14} /></div>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="settings-input-group">
                <label>College Name</label>
                <input type="text" defaultValue={collegeId.replace('-', ' ').toUpperCase()} />
              </div>
              <div className="settings-input-group">
                <label>College Website</label>
                <input type="text" defaultValue={`${collegeId}.edu`} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              </div>
           </div>
        </div>

        <div className="settings-input-group">
          <label>Our Mission / Bio</label>
          <textarea placeholder="Tell us about your college..." defaultValue="Leading the way in student innovation and cross-college collaboration." />
        </div>
      </section>



      <section className="settings-section-card danger-zone" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
         <div className="settings-section-header">
            <h3 style={{ color: '#ef4444' }}><ShieldAlert size={24} /> Delete College Data</h3>
            <p style={{ color: '#ef4444', opacity: 0.8 }}>CAUTION: PERMANENT DATA LOSS</p>
         </div>
         <p className="text-sm opacity-60 max-w-2xl">Deleting your college will remove all students, verified skills, and project history from the network. This cannot be undone.</p>
         <button className="btn-matrix-ghost" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444', width: 'fit-content' }}>
            DELETE COLLEGE DATA
         </button>
      </section>
    </div>
  );
};

export default CollegeSettings;
