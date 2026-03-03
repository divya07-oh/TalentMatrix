import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Globe, ShieldCheck, Zap, Database, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <AppLayout title="Institutional Intelligence Center" role="admin">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 mb-32">
                {[
                    { label: 'Total Institution Reach', value: '45.2K', icon: Globe, detail: 'Global Network' },
                    { label: 'System Compliance', value: 'Secure', icon: ShieldCheck, detail: 'Grade A+' },
                    { label: 'Data Processing', value: '8.4M', icon: Database, detail: 'Weekly Events' },
                    { label: 'Active Integration', value: '24', icon: Zap, detail: 'Live APIs' },
                ].map((stat, i) => (
                    <div key={i} className="premium-card bg-primary text-white border-none shadow-premium">
                        <div className="p-12 bg-white/10 rounded-lg w-fit mb-16">
                            <stat.icon size={20} className="text-accent" />
                        </div>
                        <h3 className="text-10 uppercase tracking-widest font-bold text-white/50 mb-8">{stat.label}</h3>
                        <p className="text-28 font-bold text-white leading-none mb-8">{stat.value}</p>
                        <p className="text-12 text-accent/80 font-medium">{stat.detail}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div className="premium-card h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-32">
                        <h2 className="text-18 font-bold">Talent Migration Analytics</h2>
                        <div className="flex gap-12">
                            <span className="flex items-center gap-8 text-12 font-bold text-primary">
                                <div className="w-8 h-8 rounded-full bg-primary"></div> Domestic
                            </span>
                            <span className="flex items-center gap-8 text-12 font-bold text-accent">
                                <div className="w-8 h-8 rounded-full bg-accent"></div> International
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                        Complex line chart visualization area
                    </div>
                </div>

                <div className="premium-card h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-32">
                        <h2 className="text-18 font-bold">Infrastructure Health</h2>
                        <button className="p-8 hover:bg-lightbg rounded-lg transition-all"><ExternalLink size={18} /></button>
                    </div>
                    <div className="space-y-24">
                        {[
                            { label: 'API Gateway', status: 'Optimal', value: 100 },
                            { label: 'Intelligence Engine', status: 'Optimal', value: 100 },
                            { label: 'Storage Cluster', status: '94% Cap', value: 94 },
                            { label: 'Authentication Layer', status: 'Optimal', value: 100 },
                        ].map((node, i) => (
                            <div key={i} className="space-y-12">
                                <div className="flex justify-between text-14 font-bold">
                                    <span>{node.label}</span>
                                    <span className={node.value === 100 ? 'text-green-600' : 'text-orange-600'}>{node.status}</span>
                                </div>
                                <div className="w-full h-4 bg-gray-100 rounded-full">
                                    <div className={`h-full rounded-full ${node.value === 100 ? 'bg-primary' : 'bg-accent'}`} style={{ width: `${node.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard;
