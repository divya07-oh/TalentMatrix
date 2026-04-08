import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative py-20 px-6 overflow-hidden">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none -z-20 bg-background"></div>
      
      {/* Ambient Pulsing Glow Nodes */}
      <div className="kinetic-glow w-[300px] h-[300px] top-10 right-20"></div>
      <div className="kinetic-glow w-[400px] h-[400px] bottom-0 left-10" style={{animationDelay: '2s'}}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-primary border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent hidden md:block"></div>
        
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-sm font-medium text-text/60 uppercase tracking-widest">
            {subtitle}
          </p>
          <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
