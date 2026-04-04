import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { registerUnifiedUser } from '../utils/mockAuth';
import { adminWhitelist } from '../data/adminWhitelist';
import './LoginPage.css';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    institutionName: '',
    email: '',
    githubId: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Password strength logic
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  }, [formData.password]);

  const validate = () => {
    const newErrors = {};
    if (!formData.institutionName.trim()) newErrors.institutionName = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    
    if (activeTab === 'student' && !formData.githubId.trim()) {
      newErrors.githubId = 'GitHub ID is required for verification';
    }

    if (activeTab === 'admin') {
      const isWhitelisted = adminWhitelist.some(
        email => email.toLowerCase() === formData.email.toLowerCase()
      );
      if (!isWhitelisted) {
        newErrors.email = 'Unauthorized admin email';
      }
    }

    if (formData.password.length < 6) newErrors.password = 'Security key too short (min 6)';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Identity keys do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) {
      if (errors.email === 'Unauthorized admin email') {
        addToast('Unauthorized admin email. Please contact system root.', 'error');
      }
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const user = registerUnifiedUser({
          institutionName: formData.institutionName,
          email: formData.email,
          password: formData.password,
          githubId: formData.githubId,
          role: activeTab // Force the role based on the tab
        });

        setIsLoading(false);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userCollege', user.collegeId);
        
        addToast(`Identity verified as ${user.role.toUpperCase()}! Welcome.`, 'success');
        navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
      } catch (err) {
        setIsLoading(false);
        if (err.message === 'invalid_domain') {
          setErrors(prev => ({ ...prev, email: 'Institutional domain not recognized.' }));
          addToast('Please use your official college domain email.', 'error');
        } else {
          addToast('Registration failed. Please check your credentials.', 'error');
        }
      }
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  return (
    <div className="login-container">
      <div className="matrix-grid-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="logo" onClick={() => navigate('/')}>
            Talent<span>Matrix</span>
          </div>
          <h2>Initialize Registry</h2>
          <p>Register your decentralized identity within the institutional grid.</p>
        </div>

        <div className="login-tabs">
          <button 
            className={activeTab === 'student' ? 'active' : ''} 
            onClick={() => setActiveTab('student')}
          >
            <GraduationCap size={16} />
            Student Signup
          </button>
          <button 
            className={activeTab === 'admin' ? 'active' : ''} 
            onClick={() => setActiveTab('admin')}
          >
            <ShieldCheck size={16} />
            Admin Signup
          </button>
          <motion.div 
            className="tab-indicator"
            animate={{ x: activeTab === 'student' ? '0%' : '100%' }}
          />
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input 
                name="institutionName"
                type="text" 
                placeholder="Enter Name" 
                required 
                value={formData.institutionName}
                onChange={handleChange}
              />
            </div>
            {errors.institutionName && <span className="error-text"><AlertCircle size={12} /> {errors.institutionName}</span>}
          </div>

          <div className="input-group">
            <label>{activeTab === 'student' ? 'College Email' : 'Official Admin Email'}</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                name="email"
                type="email" 
                placeholder="name@college.edu" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error-text"><AlertCircle size={12} /> {errors.email}</span>}
          </div>

          {activeTab === 'student' && (
            <div className="input-group">
              <label>GitHub ID / Username</label>
              <div className="input-wrapper">
                <Github className="input-icon" size={18} />
                <input 
                  name="githubId"
                  type="text" 
                  placeholder="github-username" 
                  required 
                  value={formData.githubId}
                  onChange={handleChange}
                />
              </div>
              <span className="helper-text">Required for decentralized skill verification</span>
              {errors.githubId && <span className="error-text"><AlertCircle size={12} /> {errors.githubId}</span>}
            </div>
          )}

          <div className="input-group">
            <label>Security Key (Password)</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                name="password"
                type="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="strength-meter">
              <div 
                className="strength-bar" 
                style={{ 
                  width: `${passwordStrength}%`, 
                  backgroundColor: passwordStrength < 50 ? '#ff5252' : passwordStrength < 100 ? '#ffd740' : '#4caf50' 
                }} 
              />
            </div>
            {errors.password && <span className="error-text"><AlertCircle size={12} /> {errors.password}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Security Key</label>
            <div className="input-wrapper">
              <CheckCircle2 className="input-icon" size={18} />
              <input 
                name="confirmPassword"
                type="password" 
                placeholder="••••••••" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <span className="error-text"><AlertCircle size={12} /> {errors.confirmPassword}</span>}
          </div>

          <div className="login-btn-group">
            <button 
              type="submit" 
              className="btn-matrix-primary"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : (
                <>
                  <span>Create {activeTab === 'student' ? 'Student' : 'Admin'} Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>Already in the Registry? <span className="link" onClick={() => navigate('/login')}>Sign In</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

