import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log("Calling API: POST /api/auth/login");
    console.log("Payload:", { email, password, role });
    
    // Simulate API delay
    setTimeout(() => {
      console.log("Response:", { success: true, message: "Login successful", token: "mock_jwt_token" });
      setLoading(false);
      if (role === 'student') {
        navigate('/student/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Login simulated.`);
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Login" 
      subtitle={`Sign in to your ${role} account`}
    >
      {/* Role Toggle */}
      <div className="flex w-full mb-10 border border-border/80 overflow-hidden rounded-md relative shadow-sm">
        <button 
          onClick={() => setRole('student')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 relative z-10 ${
            role === 'student' ? 'text-[#0F1F17]' : 'text-white hover:bg-background'
          }`}
        >
          Student
        </button>
        <button 
          onClick={() => setRole('admin')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 relative z-10 ${
            role === 'admin' ? 'text-[#0F1F17]' : 'text-white hover:bg-background'
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

      <form onSubmit={handleLogin} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">
              Email Address
            </label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@collegename.edu"
              className="w-full bg-background border border-border/80 p-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-border/80 p-4 text-sm font-bold tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
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
          className="btn btn-primary w-full font-black tracking-[0.4em] disabled:opacity-50"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        
        <button 
          type="button"
          className="btn btn-outline w-full font-black tracking-[0.4em] pb-[10px]"
        >
          Continue with GitHub
        </button>
      </form>

      <div className="mt-10 pt-10 border-t border-border/60 text-center space-y-4">
        <Link to="/signup" className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-accent transition-colors block">
          Don't have an account? <span className="text-accent underline hover:text-white">Sign up</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
