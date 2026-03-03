import React from 'react';
import PublicLayout from '../layouts/PublicLayout';
import { ArrowRight, Search, Users, PieChart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-lightbg">
        <div className="container mx-auto px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[2px] bg-accent/60"></div>
              <span className="text-12 uppercase tracking-[0.3em] font-bold text-accent">Institutional Intelligence</span>
            </div>

            <h1 className="text-48 md:text-72 font-serif font-bold text-darkheading leading-[1.05] mb-8">
              Unlock <br />
              Hidden <br />
              Talent Across <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">Campus</span>
            </h1>

            <p className="text-18 text-talentgray leading-relaxed max-w-lg mb-12 font-medium opacity-90">
              Transform your university's human capital into actionable intelligence.
              The premium ecosystem for discovering and nurturing academic potential.
            </p>

            <div className="flex items-center gap-6">
              <Link to="/register" className="bg-primary text-white px-32 py-16 rounded-lg text-16 font-bold flex items-center gap-3 hover:bg-[#153a2b] transition-all shadow-premium group">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform text-accent" />
              </Link>
              <Link to="/about" className="text-talentgray hover:text-primary font-bold flex items-center gap-2 group text-16">
                Explore Features <div className="w-6 h-0.5 bg-accent group-hover:w-12 transition-all"></div>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-16 lg:mt-0">
            <div className="relative z-10 scale-110 lg:translate-x-12">
              <img
                src="/hero-mockup.png"
                alt="TalentMatrix Dashboard Mockup"
                className="rounded-2xl shadow-premium border-8 border-white/50"
              />
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 blur-3xl rounded-full -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#153a2b] border-y border-white/5">
        <div className="container mx-auto px-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Active Universities', value: '450+' },
            { label: 'Talent Profiles', value: '1.2M+' },
            { label: 'Intelligence Points', value: '85M+' },
            { label: 'Success Ratio', value: '98.2%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-32 font-bold text-accent mb-2">{stat.value}</h3>
              <p className="text-12 uppercase tracking-widest font-bold text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-30 container mx-auto px-16">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-small-label text-primary mb-4 inline-block">Platform Capabilities</span>
          <h2 className="text-40 font-bold text-darkheading mb-6">Precision intelligence for every department.</h2>
          <p className="text-18 text-talentgray">Advanced tools designed to bridge the gap between academic potential and enterprise requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Smart Search',
              desc: 'Advanced semantic search across student profiles, skills, and projects with institutional filters.',
              icon: Search
            },
            {
              title: 'Collaboration Hub',
              desc: 'Secure environments for students and faculty to co-develop projects and research initiatives.',
              icon: Users
            },
            {
              title: 'Institutional Analytics',
              desc: 'High-level dashboards for administrators to track talent growth and placement trends.',
              icon: PieChart
            },
            {
              title: 'Enterprise Security',
              desc: 'Institutional-grade security protocols ensuring data privacy and compliance across all levels.',
              icon: Shield
            },
          ].map((feature, i) => (
            <div key={i} className="premium-card group">
              <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <feature.icon size={24} />
              </div>
              <h3 className="text-20 font-semibold mb-4">{feature.title}</h3>
              <p className="text-14 text-talentgray leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Landing;