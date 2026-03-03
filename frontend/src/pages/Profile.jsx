import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Camera, Mail, Phone, MapPin, Shield, Edit3 } from 'lucide-react';

const Profile = () => {
    return (
        <AppLayout title="Institutional Profile" role="admin">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-32">
                {/* User Info Card */}
                <div className="lg:col-span-1 space-y-32">
                    <div className="premium-card text-center relative pt-48">
                        <button className="absolute top-24 right-24 p-8 text-gray-400 hover:text-primary transition-all"><Edit3 size={18} /></button>
                        <div className="relative inline-block mb-24">
                            <div className="w-120 h-120 rounded-3xl bg-primary flex items-center justify-center text-white text-48 font-bold mx-auto border-4 border-white shadow-xl">
                                JD
                            </div>
                            <button className="absolute -bottom-12 -right-12 w-40 h-40 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white"><Camera size={18} /></button>
                        </div>
                        <h2 className="text-20 font-bold text-darkheading mb-4">John Doe</h2>
                        <p className="text-small-label text-gray-500 mb-24">Senior Institutional Admin</p>
                        <div className="pt-24 border-t border-gray-50 flex justify-center gap-24">
                            <div className="text-center">
                                <p className="text-18 font-bold text-primary">24</p>
                                <p className="text-10 uppercase tracking-widest font-bold text-gray-400">Projects</p>
                            </div>
                            <div className="w-1 h-32 bg-gray-100 my-auto"></div>
                            <div className="text-center">
                                <p className="text-18 font-bold text-primary">150+</p>
                                <p className="text-10 uppercase tracking-widest font-bold text-gray-400">Collaborations</p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card">
                        <h3 className="text-small-label mb-24">Contact Information</h3>
                        <div className="space-y-20">
                            <div className="flex items-center gap-16 text-14">
                                <Mail size={16} className="text-primary/50" /> <span>john.doe@university.edu</span>
                            </div>
                            <div className="flex items-center gap-16 text-14">
                                <Phone size={16} className="text-primary/50" /> <span>+1 (555) 234-8901</span>
                            </div>
                            <div className="flex items-center gap-16 text-14">
                                <MapPin size={16} className="text-primary/50" /> <span>East Wing, Intelligence Center</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings & Details */}
                <div className="lg:col-span-3 space-y-32">
                    <div className="premium-card">
                        <h2 className="text-20 font-bold mb-32 border-b border-gray-50 pb-16">Intelligence Profile Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                            <div className="space-y-12">
                                <label className="text-small-label text-gray-500">Department</label>
                                <p className="text-16 font-bold text-darkheading">Center for Data Excellence</p>
                            </div>
                            <div className="space-y-12">
                                <label className="text-small-label text-gray-500">Institutional ID</label>
                                <p className="text-16 font-bold text-darkheading">ADM-4481-902</p>
                            </div>
                            <div className="space-y-12">
                                <label className="text-small-label text-gray-500">Access Level</label>
                                <div className="flex items-center gap-8 text-primary font-bold"><Shield size={16} /> Tier 1 Administrator</div>
                            </div>
                            <div className="space-y-12">
                                <label className="text-small-label text-gray-500">Member Since</label>
                                <p className="text-16 font-bold text-darkheading">March 2024</p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card">
                        <h2 className="text-20 font-bold mb-32 border-b border-gray-50 pb-16">Security & Preferences</h2>
                        <div className="space-y-24">
                            <div className="flex justify-between items-center py-16 border-b border-gray-50">
                                <div>
                                    <p className="text-16 font-bold">Two-Factor Authentication</p>
                                    <p className="text-14 text-bodytext">Add an extra layer of security to your account.</p>
                                </div>
                                <div className="w-48 h-24 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute right-4 top-4 w-16 h-16 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-16">
                                <div>
                                    <p className="text-16 font-bold">Intelligence Alerts</p>
                                    <p className="text-14 text-bodytext">Receive notifications for high-priority talent matches.</p>
                                </div>
                                <div className="w-48 h-24 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute left-4 top-4 w-16 h-16 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Profile;
