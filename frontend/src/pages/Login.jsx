import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans antialiased overflow-hidden">
            {/* Visual Side */}
            <div className="hidden lg:flex bg-primary p-64 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] -ml-24 -mb-24"></div>

                <Link to="/" className="flex items-center gap-12 z-10 group">
                    <div className="w-40 h-40 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-20 group-hover:scale-110 transition-transform">TM</div>
                    <span className="text-20 font-semibold tracking-tight text-white">TalentMatrix <span className="text-accent">EDU</span></span>
                </Link>

                <div className="z-10 max-w-md">
                    <h2 className="text-40 font-bold text-white mb-24">Welcome back to the Intelligence Hub.</h2>
                    <p className="text-18 text-white/70 leading-relaxed">
                        Access institutional insights and manage your academic profile with our premium secure portal.
                    </p>
                </div>

                <div className="z-10 text-white/40 text-12 pb-32">
                    © 2026 TalentMatrix EDU. Institutional Grade Talent Management.
                </div>
            </div>

            {/* Form Side */}
            <div className="bg-lightbg flex items-center justify-center p-32">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center gap-8 text-gray-500 hover:text-primary transition-colors mb-48 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-4 transition-transform" /> Back to Website
                    </Link>

                    <div className="mb-48">
                        <h1 className="text-32 font-bold mb-12">Login to your account</h1>
                        <p className="text-bodytext">Please enter your institutional credentials to continue.</p>
                    </div>

                    <form className="space-y-24">
                        <div className="space-y-8">
                            <label className="text-small-label text-gray-700">Email Address</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@university.edu"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg pl-48 pr-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex justify-between">
                                <label className="text-small-label text-gray-700">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-12 text-primary font-semibold hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg pl-48 pr-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-12">
                            <input type="checkbox" id="remember" className="w-16 h-16 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="remember" className="text-14 text-bodytext">Keep me logged in on this device</label>
                        </div>

                        <button type="submit" className="w-full h-56 bg-primary text-white rounded-lg font-bold text-16 shadow-lg shadow-primary/20 hover:bg-[#153a2b] transition-all flex items-center justify-center gap-12 group">
                            Login to Platform <LogIn size={20} className="group-hover:translate-x-4 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-48 text-center text-14 text-bodytext">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Join the Institution</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
