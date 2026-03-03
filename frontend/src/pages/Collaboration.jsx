import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Users, Plus, MessageSquare, Activity } from 'lucide-react';

const Collaboration = () => {
    return (
        <AppLayout title="Collaboration Hub" role="admin">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
                <div className="lg:col-span-2 space-y-32">
                    {/* Active Projects */}
                    <section>
                        <div className="flex justify-between items-center mb-24">
                            <h2 className="text-20 font-bold">Active Collaboration Projects</h2>
                            <button className="btn-gold-solid py-8 flex items-center gap-8"><Plus size={18} /> Create Project</button>
                        </div>

                        <div className="space-y-16">
                            {[
                                { title: 'Global Talent Index v2', lead: 'Dr. Emily Watson', members: 8, activity: 'High' },
                                { title: 'AI Ethics Review Board', lead: 'Marcus Lee', members: 4, activity: 'Moderate' },
                                { title: 'Blockchain Research Lab', lead: 'Sarah Jenkins', members: 12, activity: 'High' },
                            ].map((proj, i) => (
                                <div key={i} className="premium-card group cursor-pointer">
                                    <div className="flex justify-between items-start mb-24">
                                        <div>
                                            <h3 className="text-18 font-bold text-darkheading group-hover:text-primary transition-colors">{proj.title}</h3>
                                            <p className="text-14 text-bodytext">Project Lead: <span className="font-semibold">{proj.lead}</span></p>
                                        </div>
                                        <div className="flex -space-x-12">
                                            {[1, 2, 3, 4].map(s => (
                                                <div key={s} className="w-32 h-32 rounded-full border-2 border-white bg-gray-200"></div>
                                            ))}
                                            <div className="w-32 h-32 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-10 font-bold">+{proj.members - 4}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-24 pt-24 border-t border-gray-50">
                                        <div className="flex items-center gap-12">
                                            <div className="p-8 bg-green-50 text-green-600 rounded-lg"><Activity size={16} /></div>
                                            <div>
                                                <p className="text-10 uppercase tracking-widest font-bold text-gray-400">Activity Level</p>
                                                <p className="text-14 font-bold">{proj.activity}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-12">
                                            <div className="p-8 bg-primary/5 text-primary rounded-lg"><MessageSquare size={16} /></div>
                                            <div>
                                                <p className="text-10 uppercase tracking-widest font-bold text-gray-400">New Discussions</p>
                                                <p className="text-14 font-bold">12 Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-32">
                    {/* Recent Communications */}
                    <div className="premium-card">
                        <h2 className="text-18 font-bold mb-24">Direct Communications</h2>
                        <div className="space-y-24">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-16 cursor-pointer hover:bg-lightbg/50 p-8 rounded-xl transition-all">
                                    <div className="relative">
                                        <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">JD</div>
                                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-14 font-bold">James Dover</p>
                                        <p className="text-12 text-bodytext truncate">Reviewing the latest dataset...</p>
                                    </div>
                                    <span className="text-10 font-bold text-gray-400">2m</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-24 py-12 border-2 border-gray-100 rounded-xl text-14 font-bold text-bodytext hover:bg-lightbg transition-all">View All Conversations</button>
                    </div>

                    <div className="premium-card bg-primary text-white border-none overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-16 rotate-12 opacity-20">
                            <Users size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-18 font-bold mb-16 underline decoration-accent underline-offset-8">Institutional Meetup</h3>
                            <p className="text-14 text-white/70 mb-24">Every Friday at 4:30 PM in the Digital Excellence Hub.</p>
                            <button className="btn-gold-solid w-full border-none">RSVP Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Collaboration;
