import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

import API from '../api';

const Signup = () => {
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    github: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const normalizedEmail = formData.email?.toLowerCase().trim();
      const normalizedCollege = formData.college?.trim();
      
      // Map college to collegeId for backend compatibility
      const payload = {
        name: formData.name,
        email: normalizedEmail,
        password: formData.password,
        collegeId: role === 'admin' ? 'ADMIN-HQ' : normalizedCollege,
        role: role // Send selected role explicitly
      };
      
      const response = await API.post('/auth/signup', payload);
      const { user } = response.data;

      const normalizedUser = {
        ...user,
        _id: user.id || user._id
      };

      localStorage.setItem("user", JSON.stringify(normalizedUser));

      if (normalizedUser.role === 'student') {
        navigate('/student/dashboard');
      } else if (normalizedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle={`Joining as ${role.toUpperCase()}`}
    >
      {/* Centered Role Toggle */}
      <div className="flex w-full max-w-[280px] mx-auto mb-12 border border-border/80 overflow-hidden rounded-md relative shadow-sm">
        <button 
          onClick={() => setRole('student')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative z-10 ${
            role === 'student' ? 'text-[#0F1F17]' : 'text-white/60 hover:text-white hover:bg-background'
          }`}
        >
          Student
        </button>
        <button 
          onClick={() => setRole('admin')}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative z-10 ${
            role === 'admin' ? 'text-[#0F1F17]' : 'text-white/60 hover:text-white hover:bg-background'
          }`}
        >
          Admin
        </button>
        {/* Animated Background Selector */}
        <div 
          className={`absolute top-0 h-full w-1/2 bg-accent transition-transform duration-500 ease-in-out ${
            role === 'admin' ? 'translate-x-full' : 'translate-x-0'
          }`}
        ></div>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Full Name</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="Your full name"
              onChange={handleInputChange}
              className="w-full bg-background border border-border p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {role === 'student' && (
            <div className="space-y-1 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">College Name</label>
              <input 
                required
                name="college"
                type="text" 
                placeholder="Your college name"
                onChange={handleInputChange}
                className="w-full bg-background border border-border/80 p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
              />
            </div>
          )}

          <div className="space-y-1 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Email Address</label>
            <input 
              required
              name="email"
              type="email" 
              placeholder={role === 'student' ? "name@college.edu" : "admin@college.edu"}
              onChange={handleInputChange}
              className="w-full bg-background border border-border p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {role === 'student' && (
            <div className="space-y-1 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Git Repo User</label>
              <input 
                required
                name="github"
                type="text" 
                placeholder="Your Git username"
                onChange={handleInputChange}
                className="w-full bg-background border border-border/80 p-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
              />
            </div>
          )}

          <div className="space-y-1 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Password</label>
            <input 
              required
              name="password"
              type="password" 
              placeholder="••••••••"
              onChange={handleInputChange}
              className="w-full bg-background border border-border/80 p-3 text-xs font-bold tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 text-[10px] font-bold text-red-600 uppercase tracking-wider text-center">
            Error: {error}
          </div>
        )}

        <button 
          disabled={loading}
          className="btn btn-primary w-full font-black tracking-[0.4em] disabled:opacity-50 mt-4"
        >
          {loading ? 'Working...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-border/60 text-center space-y-4">
        <Link to="/login" className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-accent transition-colors block">
          Already have an account? <span className="text-accent underline hover:text-white">Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;
