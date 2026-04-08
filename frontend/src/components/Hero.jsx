import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Architectural Grid & Kinetic Glows */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none -z-20 bg-background"></div>
      
      {/* Ambient Pulsing Glow Nodes */}
      <div className="kinetic-glow w-96 h-96 top-20 left-10"></div>
      <div className="kinetic-glow w-[500px] h-[500px] bottom-10 right-20" style={{animationDelay: '4s'}}></div>
      
      {/* Decorative Structural Lines */}
      <div className="absolute top-0 right-[15%] w-[1px] h-full bg-border pointer-events-none hidden md:block z-0"></div>
      <div className="absolute top-[20%] left-0 w-full h-[1px] bg-border pointer-events-none hidden md:block z-0"></div>
      <div className="absolute bottom-[10%] left-0 w-full h-[1px] bg-border pointer-events-none hidden md:block z-0"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
           <div className="space-y-8 w-full flex flex-col items-center">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="space-y-4"
            >
              <h4 className="text-accent uppercase tracking-[0.3em] font-semibold text-xs py-1 px-4 border border-accent inline-block">
                Build Your Future
              </h4>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase -tracking-wider">
                Discover <br className="hidden md:block" />
                <span className="text-stroke-accent">Talent.</span> <br className="hidden md:block" />
                Build Together.
              </h1>
            </motion.div>

            <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-lg md:text-xl text-text opacity-80 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              TalentMatrix helps college students show their skills and find people to build amazing projects with. Get real-world experience today.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex justify-center pt-4"
            >
              <Link to="/signup">
                <button className="btn btn-primary tracking-widest min-w-[200px]">
                  Get Started
                </button>
              </Link>
            </motion.div>

            <div className="flex items-center gap-10 opacity-40 pt-12 justify-center">
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Simple</div>
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Fast</div>
               <div className="text-xs uppercase tracking-widest border-b border-text/20 pb-1">Reliable</div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
