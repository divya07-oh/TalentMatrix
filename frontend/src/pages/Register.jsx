import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Building, GraduationCap } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans antialiased overflow-hidden">
            {/* Form Side */}
            <div className="bg-lightbg flex items-center justify-center p-32">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center gap-8 text-gray-500 hover:text-primary transition-colors mb-48 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-4 transition-transform" /> Back to Website
                    </Link>

                    <div className="mb-48">
                        <h1 className="text-32 font-bold mb-12">Join TalentMatrix EDU</h1>
                        <p className="text-bodytext">Create your premium institutional profile to start accelerating your growth.</p>
                    </div>

                    <form className="space-y-24">
                        <div className="grid grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <label className="text-small-label text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg px-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                            <div className="space-y-8">
                                <label className="text-small-label text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg px-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <label className="text-small-label text-gray-700">Institutional Email</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="john.doe@university.edu"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg pl-48 pr-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <label className="text-small-label text-gray-700">You are registering as:</label>
                            <div className="grid grid-cols-2 gap-16">
                                <button type="button" className="h-56 border-2 border-primary bg-primary/5 text-primary rounded-lg flex items-center justify-center gap-12 font-bold transition-all">
                                    <GraduationCap size={20} /> Student
                                </button>
                                <button type="button" className="h-56 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary text-gray-500 rounded-lg flex items-center justify-center gap-12 font-bold transition-all">
                                    <User size={20} /> Faculty
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <label className="text-small-label text-gray-700">Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full h-56 bg-white border border-gray-200 rounded-lg pl-48 pr-16 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full h-56 bg-accent text-white rounded-lg font-bold text-16 shadow-lg shadow-accent/20 hover:bg-[#c4a030] transition-all">
                            Initialize Account
                        </button>
                    </form>

                    <div className="mt-48 text-center text-14 text-bodytext">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:flex bg-primary p-64 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]"></div>

                <div className="z-10 flex justify-end">
                    <div className="w-40 h-40 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-20">TM</div>
                </div>

                <div className="z-10">
                    <h2 className="text-40 font-bold text-white mb-32 max-w-sm ml-auto text-right">Join a network of academic excellence.</h2>
                    <div className="flex flex-col gap-24 items-end">
                        <div className="premium-card bg-white/5 border-white/20 p-24 text-white/80 max-w-xs text-right">
                            "The most advanced placement intelligence I've used in 15 years."
                            <div className="text-accent font-bold mt-12">— Dr. Elizabeth Reed</div>
                        </div>
                        <div className="premium-card bg-white/5 border-white/20 p-24 text-white/80 max-w-xs text-right">
                            "Connected me with high-impact research projects instantly."
                            <div className="text-accent font-bold mt-12">— Marcus Chen</div>
                        </div>
                    </div>
                </div>

                <div className="z-10 text-white/40 text-12">
                    Trusted by over 450 global educational institutions.
                </div>
            </div>
        </div>
    );
};

export default Register;
