import React from 'react';
import PublicNavbar from '../components/common/PublicNavbar';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-lightbg font-sans antialiased">
            <PublicNavbar />
            <main>
                {children}
            </main>
            <footer className="bg-primary text-white py-16 mt-16 border-t-4 border-accent">
                <div className="container mx-auto px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary text-20">TM</div>
                            <span className="text-20 font-semibold tracking-tight">TalentMatrix <span className="text-accent underline decoration-2">EDU</span></span>
                        </div>
                        <p className="text-white/60 text-14 leading-relaxed">
                            Advancing university talent intelligence through data-driven insights and premium enterprise collaboration.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-16 font-semibold mb-6">Platform</h4>
                        <ul className="space-y-3 text-white/60 text-14">
                            <li className="hover:text-white transition-colors cursor-pointer">Smart Search</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Collaboration</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Analytics</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-16 font-semibold mb-6">Institution</h4>
                        <ul className="space-y-3 text-white/60 text-14">
                            <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Faculty Outreach</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-16 font-semibold mb-6">Legal</h4>
                        <ul className="space-y-3 text-white/60 text-14">
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-16 border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-12">
                    <p>© 2026 TalentMatrix EDU. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                        <span>Institutional Support</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
