import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-40 bg-primary relative">
      <div className="absolute inset-0 grid-pattern-subtle opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto border-4 border-primary p-12 md:p-24 space-y-12 text-center relative group">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent rounded-bl-xl rounded-tr-xl shadow-sm"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary rounded-tl-xl rounded-br-xl shadow-sm"></div>
          
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="space-y-6"
          >
             <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                Start Building <br />Your Future Today.
             </h2>
             <p className="text-lg md:text-xl text-text/70 max-w-2xl mx-auto font-medium selection:bg-accent selection:text-white uppercase tracking-widest leading-relaxed">
                Ready to build your first project? Sign up and start collaborating with other students.
             </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-col sm:flex-row gap-6 justify-center"
          >
             <Link to="/signup">
               <button className="btn btn-primary tracking-[0.3em] min-w-[220px]">
                  Sign Up Now
               </button>
             </Link>
             <a href="#footer">
               <button className="btn btn-outline font-bold uppercase tracking-[0.3em] min-w-[220px]">
                  Contact Us
               </button>
             </a>
          </motion.div>

          <div className="pt-8 opacity-40">
             <div className="text-xs uppercase tracking-[0.5em]">TalentMatrix v1.0</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
