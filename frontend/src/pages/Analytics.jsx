import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { BarChart3, PieChart, TrendingUp, Download, Calendar } from 'lucide-react';

const Analytics = () => {
    return (
        <AppLayout title="Institutional Analytics Intelligence" role="admin">
            <div className="flex justify-between items-center mb-32">
                <div className="flex gap-16">
                    <button className="h-44 px-20 bg-white border border-gray-200 rounded-lg flex items-center gap-12 font-bold text-14 hover:border-primary transition-all">
                        <Calendar size={18} /> Last 90 Days
                    </button>
                    <button className="h-44 px-20 bg-white border border-gray-200 rounded-lg flex items-center gap-12 font-bold text-14 hover:border-primary transition-all">
                        Filter: All Departments
                    </button>
                </div>
                <button className="btn-gold-solid py-10 flex items-center gap-8"><Download size={18} /> Export Intelligence Report</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-32">
                <div className="premium-card min-h-[400px]">
                    <div className="flex justify-between items-center mb-32 border-b border-gray-50 pb-16">
                        <h2 className="text-18 font-bold flex items-center gap-12"><BarChart3 size={20} className="text-primary" /> Growth Velocity</h2>
                        <span className="text-12 font-bold text-green-600 bg-green-50 px-12 py-4 rounded-full">+12.4% vs prev period</span>
                    </div>
                    <div className="h-full flex items-center justify-center text-gray-400 italic">
                        Complex data visualization placeholder
                    </div>
                </div>
                <div className="premium-card min-h-[400px]">
                    <div className="flex justify-between items-center mb-32 border-b border-gray-50 pb-16">
                        <h2 className="text-18 font-bold flex items-center gap-12"><PieChart size={20} className="text-accent" /> Skill Distribution</h2>
                        <span className="text-12 font-bold text-primary">Across High-Potentials</span>
                    </div>
                    <div className="h-full flex items-center justify-center text-gray-400 italic">
                        Skill distribution chart visualization placeholder
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
                {[
                    { label: 'Intelligence Depth', value: '88.4', icon: TrendingUp },
                    { label: 'Placement Efficiency', value: '72.1%', icon: TrendingUp },
                    { label: 'Innovation Quotient', value: 'Active', icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="premium-card">
                        <div className="flex items-center gap-16">
                            <div className="p-12 bg-primary/5 text-primary rounded-xl">
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-small-label mb-4">{stat.label}</p>
                                <p className="text-24 font-bold text-darkheading">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
};

export default Analytics;
