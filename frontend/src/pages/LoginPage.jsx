import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Github, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { verifyLogin } from '../utils/mockAuth';
import './LoginPage.css';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    githubId: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication logic
    setTimeout(() => {
      const user = verifyLogin(formData.email, formData.password);
      
      if (user) {
        // Role-based validation (enforce the tab selection)
        if (activeTab === 'admin' && user.role !== 'admin') {
          addToast('Access Denied: This account does not have administrative privileges.', 'error');
          setIsLoading(false);
          return;
        }

        if (activeTab === 'student' && user.role === 'admin') {
          addToast('Admin detected. Please use the Admin Login tab.', 'info');
          setActiveTab('admin');
          setIsLoading(false);
          return;
        }

        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userCollege', user.collegeId);
        localStorage.setItem('userEmail', user.email);
        
        addToast(`Welcome back, ${user.institutionName || 'Student'}!`, 'success');
        navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
      } else {
        addToast('Invalid credentials. Please verify your email and password.', 'error');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h2>Welcome Back</h2>
          <p>Sign in to your account with your college email.</p>
        </div>

        <div className="login-tabs">
          <button 
            className={activeTab === 'student' ? 'active' : ''} 
            onClick={() => setActiveTab('student')}
          >
            <GraduationCap size={16} />
            Student Login
          </button>
          <button 
            className={activeTab === 'admin' ? 'active' : ''} 
            onClick={() => setActiveTab('admin')}
          >
            <ShieldCheck size={16} />
            Admin Login
          </button>
          <motion.div 
            className="tab-indicator"
            animate={{ x: activeTab === 'student' ? '0%' : '100%' }}
          />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="input-group">
                <label>{activeTab === 'student' ? 'College Email' : 'Admin Email'}</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    name="email"
                    type="email" 
                    placeholder={activeTab === 'student' ? "name@college.edu" : "admin@college.edu"}
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {activeTab === 'student' && (
                <div className="input-group">
                  <label>GitHub ID (Optional)</label>
                  <div className="input-wrapper">
                    <Github className="input-icon" size={18} />
                    <input 
                      name="githubId"
                      type="text" 
                      placeholder="github-username" 
                      value={formData.githubId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Password</label>
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
                <span className="forgot-password">Forgot password?</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="login-btn-group">
            <button 
              type="submit" 
              className="btn-matrix-primary"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : (
                <>
                  <span>Sign In as {activeTab === 'student' ? 'Student' : 'Admin'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {activeTab === 'student' && (
              <button 
                type="button" 
                className="btn-matrix-ghost github-btn"
                onClick={() => addToast('GitHub auth for colleges coming soon!', 'info')}
              >
                <Github size={18} />
                <span>Continue with GitHub</span>
              </button>
            )}
          </div>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <span className="link" onClick={() => navigate('/signup')}>Sign up</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

