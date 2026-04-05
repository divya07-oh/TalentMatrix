import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FastForward, Globe2 } from 'lucide-react';

const WhyTalentMatrix = () => {
  const benefits = [
    {
      icon: <Globe2 className="text-white" />,
      title: "Discover Hidden Talent",
      desc: "Go beyond standard institutional resumes with precision talent mapping."
    },
    {
      icon: <FastForward className="text-white" />,
      title: "Build Real Projects",
      desc: "Accelerate your development with industry-grade project collaboration."
    },
    {
      icon: <Shield className="text-white" />,
      title: "Cross-College Network",
      desc: "Secure, verified, and inclusive global student community."
    }
  ];

  return (
    <section id="why-talentmatrix" className="py-32 bg-primary/70 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-subtle opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs">Why TalentMatrix?</span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
            Show your talent. <br />Grow your career.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Simple to Use",
              desc: "We make it easy for you to showcase your skills and find the best projects to work on."
            },
            {
              title: "Connect with Everyone",
              desc: "Build a network of students from across the country and different colleges."
            },
            {
              title: "Verified Profiles",
              desc: "Get your skills approved by admins so you can stand out to everyone."
            }
          ].map((reason, i) => (
            <div key={i} className={`arch-card p-10 flex flex-col items-center text-center space-y-6 group animate-fade-in animate-stagger-${i+1}`}>
              <div className="w-16 h-16 bg-primary border border-border flex items-center justify-center font-black text-xl text-white group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-primary shadow-lg transition-all duration-300 rounded-full group-hover:scale-110">
                0{i + 1}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{reason.title}</h3>
                <p className="text-sm font-medium text-text/60 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTalentMatrix;
