import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Create Profile",
    desc: "Set up your profile with your college email. It only takes a minute."
  },
  {
    number: "02",
    title: "Add Skills",
    desc: "Upload your projects and skills as proof of your work."
  },
  {
    number: "03",
    title: "Wait for Approval",
    desc: "Admins will review your skills and projects to approve them."
  },
  {
    number: "04",
    title: "Collaborate",
    desc: "Connect with students across colleges and start building real projects together."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs">Simple Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
            Get <br />Started.
          </h2>
          <div className="w-24 h-1 bg-accent mt-4"></div>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-[40px] left-0 w-full h-[1px] bg-border hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className="relative group pt-10"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary border border-border flex items-center justify-center -translate-y-4 shadow-sm group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <span className="text-2xl font-black text-white group-hover:text-white transition-colors tracking-tighter">
                    {step.number}
                  </span>
                </div>
                
                <div className="pt-8 space-y-4 text-center lg:text-left">
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-tight px-2">{step.title}</h3>
                  <p className="text-sm font-medium text-text/70 leading-relaxed max-w-xs mx-auto lg:mx-0 pr-4">
                    {step.desc}
                  </p>
                </div>
                
                {/* Decorative Structural Indicator */}
                <div className="flex items-center gap-2 mt-8 opacity-20 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1 h-[1px] bg-accent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
