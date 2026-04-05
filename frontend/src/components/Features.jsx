import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CheckCircle2, 
  Search, 
  Users, 
  Globe, 
  Layers 
} from 'lucide-react';

const features = [
  {
    icon: <Globe className="text-accent" />,
    title: "Profiles",
    desc: "Show off your skills to other students and admins."
  },
  {
    icon: <CheckCircle2 className="text-text-muted" />,
    title: "Skill Approval",
    desc: "Admins check your skills to make sure you're ready for projects."
  },
  {
    icon: <Search className="text-white" />,
    title: "Smart Search",
    desc: "Find people with the skills you need for your projects."
  },
  {
    icon: <Users className="text-accent" />,
    title: "Collaboration",
    desc: "Easily work with other students on any project."
  },
  {
    icon: <Layers className="text-text-muted" />,
    title: "Work with Anyone",
    desc: "Connect with students from different colleges and departments."
  },
  {
    icon: <BarChart3 className="text-white" />,
    title: "Insights",
    desc: "Admins can see how students are progressing."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-32 bg-primary/40 backdrop-blur-sm border-y border-white/60 relative">
      <div className="absolute inset-0 grid-pattern-subtle opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs">Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
              Everything <br />You Need.
            </h2>
          </div>
          <div className="max-w-sm text-right hidden lg:block">
            <p className="text-sm font-medium text-text/60 leading-relaxed uppercase tracking-wider">
              We built these tools to help you grow your skills and find the right team for your projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {features.map((feature, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="group p-12 border-b border-r border-border hover:bg-background transition-colors duration-500 relative overflow-hidden"
            >
              <div className="w-12 h-12 mb-8 flex items-center justify-center p-3 border border-border group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                {React.cloneElement(feature.icon, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
              <p className="text-text/70 leading-relaxed text-sm font-medium">
                {feature.desc}
              </p>
              
              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-border group-hover:bg-accent transition-colors"></div>
                <div className="absolute bottom-4 right-1 w-2 h-[1px] bg-border group-hover:bg-accent transition-colors"></div>
                <div className="absolute bottom-1 right-4 w-[1px] h-2 bg-border group-hover:bg-accent transition-colors"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
