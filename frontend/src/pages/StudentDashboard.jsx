import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Award, BookOpen, Clock, TrendingUp, Search, Users } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <AppLayout title="Student Dashboard" role="student">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
        {[
          { label: 'Academic Score', value: '3.8', icon: Award, trend: '+0.2 from last term' },
          { label: 'Active Projects', value: '4', icon: BookOpen, trend: '2 ending this week' },
          { label: 'Collaboration Hours', value: '48h', icon: Clock, trend: '+12h this month' },
          { label: 'Talent Ranking', value: 'Top 5%', icon: TrendingUp, trend: 'Global Percentile' },
        ].map((stat, i) => (
          <div key={i} className="premium-card">
            <div className="flex justify-between items-start mb-16">
              <div className="p-12 bg-primary/5 text-primary rounded-lg">
                <stat.icon size={20} />
              </div>
              <span className="text-10 font-bold text-green-600 bg-green-50 px-8 py-4 rounded-full">{stat.trend}</span>
            </div>
            <h3 className="text-small-label mb-8">{stat.label}</h3>
            <p className="text-24 font-bold text-darkheading">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-24">
          <div className="premium-card">
            <div className="flex justify-between items-center mb-24">
              <h2 className="text-18 font-bold">Recommended Collaborations</h2>
              <button className="text-14 font-semibold text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-16">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-16 rounded-xl bg-lightbg/50 border border-gray-100 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-16">
                    <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="text-14 font-bold mb-4">AI Research Group - Neural Networks</h4>
                      <p className="text-12 text-bodytext">Led by Dr. Sarah Smith • 4 members joined</p>
                    </div>
                  </div>
                  <button className="btn-gold-outline py-4 px-16 text-12">Apply</button>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <h2 className="text-18 font-bold mb-24">Skills Intelligence</h2>
            <div className="h-200 flex items-center justify-center text-gray-400 italic">
              Skill radar chart visualization placeholder
            </div>
          </div>
        </div>

        <div className="space-y-24">
          <div className="premium-card bg-primary text-white">
            <h2 className="text-18 font-bold mb-16">Smart Match</h2>
            <p className="text-14 text-white/70 mb-24 leading-relaxed">
              Based on your recent project in "Data Visualization", we found 3 new opportunities.
            </p>
            <button className="w-full btn-gold-solid border-none">Explore Matches</button>
          </div>

          <div className="premium-card">
            <h2 className="text-small-label mb-16">Recent Activity</h2>
            <div className="space-y-16">
              {[
                { type: 'Update', msg: 'Profile view from Faculty Hub', time: '2h ago' },
                { type: 'Project', msg: 'Joined Blockchain Lab', time: '5h ago' },
                { type: 'Alert', msg: 'New skill badge: Python Expert', time: '1d ago' },
              ].map((act, i) => (
                <div key={i} className="flex gap-12 text-12 pb-12 border-b border-gray-50 last:border-0 last:pb-0">
                  <span className="font-bold text-primary">{act.time}</span>
                  <span className="text-bodytext">{act.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
