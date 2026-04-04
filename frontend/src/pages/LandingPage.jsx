import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  ChevronRight,
  Globe,
  Lock,
  Zap,
  Cpu,
  ShieldAlert,
  Terminal,
  Columns,
  Activity,
  Award,
  BookOpen,
  Codepen,
  Command,
  Database,
  Layers,
  Layout,
  Network,
  Settings,
  Star as StarIcon
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const partners = [
    { name: 'MIT', node: 'NODE.MT.01' },
    { name: 'Stanford', node: 'NODE.ST.05' },
    { name: 'IIT Delhi', node: 'NODE.ID.22' },
    { name: 'Google Cloud', node: 'NODE.GC.10' },
    { name: 'AWS EDU', node: 'NODE.AE.07' },
    { name: 'Anthropic', node: 'NODE.AN.04' }
  ];

  const thesisNodes = [
    { title: 'Profile', desc: 'Create your professional profile with your college email.' },
    { title: 'Connect', desc: 'Find other talented students to collaborate with.' },
    { title: 'Teams', desc: 'Form agile teams to solve real-world challenges.' },
    { title: 'Build', desc: 'Ship live projects and build your proof-of-work.' }
  ];

  const networkStats = [
    { value: '128k+', label: 'Active Students' },
    { value: '94%', label: 'Project Success' },
    { value: '412', label: 'Partner Colleges' },
    { value: '24/7', label: 'Uptime' }
  ];

  const peerReviews = [
    { author: 'Dr. Sarah Chen', role: 'Dean of Engineering', text: 'TalentMatrix has transformed how our students approach interdisciplinary innovation.' },
    { author: 'James Wilson', role: 'Fullstack Lead', text: 'The granularity of skill mapping makes finding a collaborator for complex systems effortless.' },
    { author: 'Ananya Rao', role: 'Design Director', text: 'Finally, a professional ecosystem that treats student collaboration with real importance.' }
  ];

  // Dynamic Skill Galaxy Component
  const SkillGalaxy = () => {
    const skills = ['React', 'Python', 'AI/ML', 'UI/UX', 'Cloud', 'Data', 'Web3', 'Node', 'Figma', 'Solidity'];
    return (
      <div className="skill-galaxy-container">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            className="galaxy-skill-node"
            animate={{
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + (i % 5) * 15}%`,
              top: `${20 + Math.floor(i / 5) * 30}%`,
              fontSize: `${0.8 + Math.random() * 0.5}rem`
            }}
          >
            {skill}
          </motion.div>
        ))}
        <div className="galaxy-core">
          <Activity size={48} className="text-matrix-accent" />
        </div>
      </div>
    );
  };

  return (
    <div className="matrix-theme">
      <div className="matrix-grid-overlay"></div>

      <nav className="matrix-nav">
        <div className="logo-matrix" onClick={() => navigate('/')}>
          Talent<span>Matrix</span>
          <motion.span 
            className="nav-coords"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            // LAT.40.71 LON.74.00
          </motion.span>
        </div>
        <div className="matrix-nav-links">
          <button className="btn-matrix-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-matrix-primary" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <section className="matrix-hero">
        <div className="hero-matrix-container reveal-blueprint">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-matrix-title"
          >
            <h1>TALENT<br/>MATRIX</h1>
            <motion.div 
              className="accent-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
              style={{ originX: 0 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hero-matrix-info"
          >
            <p>
              The best place for students to work together on amazing projects. 
              Connect with talented students from colleges around the world.
            </p>
            <div className="hero-matrix-actions">
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-matrix-primary" 
                onClick={() => navigate('/signup')}
              >
                Get Started Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-matrix-ghost" 
                onClick={() => navigate('/login')}
              >
                College Admin Login
              </motion.button>
            </div>
          </motion.div>
        </div>
        <SkillGalaxy />
      </section>

      <div className="matrix-partner-strip">
        <div className="strip-container">
          {partners.map((p, i) => (
            <div key={i} className="partner-node">
              <span className="p-name">{p.name}</span>
              <span className="p-code">{p.node}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="matrix-thesis" id="thesis">
        <span className="section-label">01 // HOW IT WORKS</span>
        <div className="thesis-grid">
          {thesisNodes.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                backgroundColor: 'var(--matrix-grid)',
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="thesis-node glimmer-hover"
            >
              <div className="node-num">0{i+1}</div>
              <h3>{node.title}</h3>
              <p>{node.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="network-intelligence" id="network">
        <span className="section-label">02 // PLATFORM STATS</span>
        <div className="stats-matrix">
          {networkStats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="stat-node"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="stat-val">{stat.value}</div>
              <div className="stat-lab">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="peer-reviews">
        <span className="section-label">03 // WHAT STUDENTS SAY</span>
        <div className="reviews-grid">
          {peerReviews.map((rev, i) => (
            <motion.div 
              key={i}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="quote-icon">“</div>
              <p className="rev-text">{rev.text}</p>
              <div className="rev-meta">
                <span className="rev-author">{rev.author}</span>
                <span className="rev-role">{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="matrix-invitation">
        <span className="section-label">04 // JOIN THE COMMUNITY</span>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="invitation-content"
        >
          <h2>BUILD YOUR<br/>FUTURE</h2>
          <p>Collaborate with the best students and build your professional portfolio.</p>
          <button className="btn-matrix-primary" onClick={() => navigate('/signup')}>
            Join Now
          </button>
        </motion.div>
      </section>

      <footer className="matrix-footer">
        <div className="footer-grid">
          <div className="footer-col-main">
            <div className="logo-matrix">T<span>M</span></div>
            <p className="footer-desc">The professional ecosystem for student collaboration and skill verification.</p>
          </div>
          <div className="footer-nav-group">
            <div className="footer-col">
              <h4>System</h4>
              <a href="#thesis">Platform</a>
              <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Registry</a>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <a href="#">Partner Colleges</a>
              <a href="#">Showcase</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-meta">
            &copy; 2024 TALENTMATRIX // BUILT FOR STUDENTS
          </div>
          <div className="footer-meta">
            PLATFORM ACTIVE // SECURE ACCESS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
