import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Architectural Grid & Kinetic Glows */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none -z-20 bg-background"></div>
      
      {/* Ambient Pulsing Glow Nodes */}
      <div className="kinetic-glow w-96 h-96 top-20 left-10"></div>
      <div className="kinetic-glow w-[500px] h-[500px] bottom-10 right-20" style={{animationDelay: '4s'}}></div>
      
      {/* Decorative Structural Lines */}
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-border pointer-events-none hidden md:block z-0"></div>
      <div className="absolute top-[20%] left-0 w-full h-[1px] bg-border pointer-events-none hidden md:block z-0"></div>
      <div className="absolute bottom-[10%] left-0 w-full h-[1px] bg-border pointer-events-none hidden md:block z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="space-y-4"
            >
              <h4 className="text-accent uppercase tracking-[0.3em] font-semibold text-xs py-1 px-4 border border-accent inline-block mx-auto lg:mx-0">
                Build Your Future
              </h4>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase -tracking-wider">
                Discover <br />
                <span className="text-stroke-accent">Talent.</span> <br />
                Build Together.
              </h1>
            </motion.div>

            <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-lg md:text-xl text-text opacity-80 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              TalentMatrix helps college students show their skills and find people to build amazing projects with. Get real-world experience today.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
            >
              <Link to="/signup">
                <button className="btn btn-primary tracking-widest min-w-[200px]">
                  Get Started
                </button>
              </Link>
              <button className="btn btn-outline font-bold uppercase tracking-widest min-w-[200px]">
                Explore
              </button>
            </motion.div>

            <div className="flex items-center gap-10 opacity-40 pt-12 justify-center lg:justify-start">
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Simple</div>
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Fast</div>
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Reliable</div>
            </div>
          </div>

          {/* Right Visual Element (Abstract Geometric) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 w-full max-w-xl lg:max-w-none relative aspect-square hidden md:block"
          >
            <div className="absolute inset-0 border-[3px] border-primary/20 rotate-3"></div>
            <div className="absolute inset-0 border-2 border-accent/30 -rotate-3"></div>
            <div className="absolute inset-8 border border-border bg-primary shadow-2xl flex flex-col p-10 overflow-hidden group ring-1 ring-border">
              <div className="grid-pattern-subtle absolute inset-0 opacity-10"></div>
              <div className="relative z-10 mb-8">
                <div className="w-16 h-[2px] bg-primary mb-4 group-hover:w-32 transition-all duration-500"></div>
                <div className="text-4xl font-bold uppercase text-white leading-tight">Construction <br />Of Future <br />Skills.</div>
              </div>
              <div className="mt-auto relative z-10">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`aspect-square border border-border group-hover:bg-accent/10 transition-colors ${i % 3 === 0 ? 'bg-primary/5' : ''}`} style={{ transitionDelay: `${i * 30}ms` }}></div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Dots */}
              <div className="absolute top-4 right-4 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-border group-hover:bg-accent"></div>
                ))}
              </div>
            </div>
            
            {/* Float Element Overlay */}
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-6 shadow-xl w-48 space-y-2 border border-primary z-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
              <div className="text-[10px] uppercase tracking-widest opacity-60">Success Rate</div>
              <div className="text-3xl font-bold tracking-tighter">99.8%</div>
              <div className="w-full bg-primary/20 h-1">
                <div className="w-4/5 h-full bg-accent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
