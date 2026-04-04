import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getInvite, createAdminAccount } from '../utils/mockAuth';
import './AdminInvitePage.css';

const AdminInvitePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    collegeId: ''
  });

  const [errors, setErrors] = useState({});

  // Mock Token Verification Handshake
  useEffect(() => {
    const verifyToken = () => {
      // Simulation of secure backend handshake
      setTimeout(() => {
        const invite = getInvite(token);
        if (invite && invite.status === 'pending') {
          setIsValidToken(true);
          setFormData(prev => ({ 
            ...prev, 
            email: invite.email,
            collegeId: invite.collegeId 
          }));
        } else {
          setIsValidToken(false);
        }
        setIsVerifying(false);
      }, 1500);
    };

    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulation of institutional account creation
    setTimeout(() => {
      setIsLoading(false);
      createAdminAccount(token, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        collegeId: formData.collegeId
      });
      addToast('Admin account created successfully!', 'success');
      navigate('/login');
    }, 2000);
  };

  if (isVerifying) {
    return (
      <div className="invite-container">
        <div className="matrix-grid-overlay"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="invite-card"
          style={{ textAlign: 'center' }}
        >
          <div className="spinner" style={{ margin: '0 auto 1.5rem', width: '40px', height: '40px', borderWidth: '3px' }}></div>
          <p style={{ color: 'var(--matrix-text-dim)' }}>Verifying invitation node security...</p>
        </motion.div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="invite-container">
        <div className="matrix-grid-overlay"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="invite-card invalid-token-container"
        >
          <ShieldAlert size={64} color="#ff5252" style={{ marginBottom: '1.5rem' }} />
          <h2>Invalid or Expired Invite Link</h2>
          <p style={{ color: 'var(--matrix-text-dim)', marginBottom: '2rem' }}>
            This invitation token is no longer valid or has expired. Please contact your system administrator to request a new access node.
          </p>
          <button 
            className="btn-matrix-ghost btn-full" 
            onClick={() => navigate('/')}
          >
            Return to Terminal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="invite-container">
      <div className="matrix-grid-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="invite-card"
      >
        <div className="invite-header">
          <ShieldCheck size={48} style={{ color: '#2d5a27', marginBottom: '1rem' }} />
          <h1>Create Admin Account</h1>
          <p>You have been invited to join <strong>TalentMatrix</strong> as a college administrator. Set up your credentials below.</p>
        </div>

        <form className="invite-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Institutional Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                name="email"
                type="email" 
                value={formData.email} 
                readOnly 
              />
            </div>
            <span className="helper-text" style={{ color: '#2d5a27', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', marginTop: '0.4rem' }}>
              <CheckCircle2 size={12} /> Verified Institutional Node
            </span>
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input 
                name="fullName"
                type="text" 
                placeholder="Alex D. Johnson" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <span className="error-msg"><AlertCircle size={14} /> {errors.fullName}</span>}
          </div>

          <div className="input-group">
            <label>Admin Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                name="password"
                type="password" 
                placeholder="••••••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error-msg"><AlertCircle size={14} /> {errors.password}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                name="confirmPassword"
                type="password" 
                placeholder="••••••••••••" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <span className="error-msg"><AlertCircle size={14} /> {errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="btn-invite-primary"
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : (
              <>
                <span>Secure Join</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminInvitePage;
