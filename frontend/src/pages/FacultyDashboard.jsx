import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { UserPlus, MessageSquare, ClipboardList, Briefcase, ChevronRight } from 'lucide-react';

const FacultyDashboard = () => {
    return (
        <AppLayout title="Faculty Intelligence Dashboard" role="faculty">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
                {[
                    { label: 'Active Requirements', value: '12', icon: Briefcase, color: 'text-blue-600' },
                    { label: 'Student Applications', value: '148', icon: UserPlus, color: 'text-green-600' },
                    { label: 'Ongoing Projects', value: '5', icon: ClipboardList, color: 'text-purple-600' },
                    { label: 'Unread Messages', value: '24', icon: MessageSquare, color: 'text-orange-600' },
                ].map((stat, i) => (
                    <div key={i} className="premium-card">
                        <div className="p-12 bg-primary/5 rounded-lg w-fit mb-16">
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <h3 className="text-small-label mb-8">{stat.label}</h3>
                        <p className="text-28 font-bold text-darkheading">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                <div className="lg:col-span-2">
                    <div className="premium-card">
                        <div className="flex justify-between items-center mb-24">
                            <div>
                                <h2 className="text-18 font-bold">Talent Pipeline</h2>
                                <p className="text-14 text-bodytext">Top students matched to your research requirements.</p>
                            </div>
                            <button className="btn-gold-solid py-8">Post New Requirement</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 pb-12">
                                        <th className="text-small-label py-12">Student Name</th>
                                        <th className="text-small-label py-12">Match Score</th>
                                        <th className="text-small-label py-12">Status</th>
                                        <th className="text-small-label py-12">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { name: 'Alex Thompson', score: '98%', status: 'Shortlisted' },
                                        { name: 'Maria Garcia', score: '94%', status: 'Applied' },
                                        { name: 'Kevin Zhang', score: '92%', status: 'Invited' },
                                        { name: 'Sarah Miller', score: '89%', status: 'Reviewing' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-lightbg/50 transition-colors">
                                            <td className="py-16">
                                                <div className="flex items-center gap-12">
                                                    <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                                                    <span className="font-semibold text-14">{row.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-16 font-bold text-primary">{row.score}</td>
                                            <td className="py-16">
                                                <span className="px-8 py-4 bg-primary/10 text-primary text-10 font-bold rounded-full uppercase">{row.status}</span>
                                            </td>
                                            <td className="py-16">
                                                <button className="p-8 text-gray-400 hover:text-primary transition-colors">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-24">
                    <div className="premium-card">
                        <h2 className="text-18 font-bold mb-24">Department Overview</h2>
                        <div className="space-y-24">
                            <div>
                                <div className="flex justify-between text-12 font-bold mb-8">
                                    <span>Resource Utilization</span>
                                    <span>78%</span>
                                </div>
                                <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[78%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-12 font-bold mb-8">
                                    <span>Engagement Rate</span>
                                    <span>92%</span>
                                </div>
                                <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="bg-accent h-full w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card border-l-4 border-accent">
                        <h3 className="text-14 font-bold mb-8 text-darkheading uppercase tracking-wider">Note from Admin</h3>
                        <p className="text-14 text-bodytext italic leading-relaxed">
                            "Please review the new research ethics protocol before finalising student onboardings for the Summer term."
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default FacultyDashboard;
