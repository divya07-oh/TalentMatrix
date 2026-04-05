import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="py-20 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 grid-pattern opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-primary"></div>
              <span className="text-xl font-bold text-white uppercase tracking-[0.2em]">TalentMatrix</span>
            </div>
            <p className="text-sm font-medium text-text/60 leading-relaxed uppercase tracking-widest">
              Helping students build their future through collaboration. One project at a time.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-24 uppercase tracking-[0.2em] font-bold text-xs text-white">
             <div className="space-y-6">
                <h4 className="text-accent">Product</h4>
                <div className="flex flex-col gap-4 text-text/60">
                   <a href="#features" className="hover:text-accent transition-colors">Features</a>
                   <a href="#how-it-works" className="hover:text-accent transition-colors">How it Works</a>
                   <a href="#why-talentmatrix" className="hover:text-accent transition-colors">Why us?</a>
                </div>
             </div>
             
             <div className="space-y-6">
                <h4 className="text-accent">Company</h4>
                <div className="flex flex-col gap-4 text-text/60">
                   <a href="#" className="hover:text-accent transition-colors">About</a>
                   <a href="#" className="hover:text-accent transition-colors">Contact</a>
                   <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                </div>
             </div>
             
             <div className="space-y-6 hidden sm:block">
                <h4 className="text-accent">Support</h4>
                <div className="flex flex-col gap-4 text-text/60">
                   <a href="#" className="hover:text-accent transition-colors">Docs</a>
                   <a href="#" className="hover:text-accent transition-colors">Help</a>
                   <a href="#" className="hover:text-accent transition-colors">Terms</a>
                </div>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/60 gap-4">
           <div className="text-[10px] uppercase font-bold text-text/40 tracking-[0.5em]">© 2026 TalentMatrix</div>
           <div className="flex gap-8 text-[10px] uppercase font-black text-text/40 tracking-[0.3em]">
              <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                 System Online
              </span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
