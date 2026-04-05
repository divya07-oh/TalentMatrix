import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Plus, 
  Users, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  LayoutGrid,
  Settings,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

const ProjectWorkspace = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("Calling API: GET /api/projects/user/123");
    setTimeout(() => {
      const mockProjects = [
        { id: 1, name: "TalentMatrix Frontend Refactor", members: ["Alex", "Sam"], progress: 45, status: "active", createdAt: "2024-03-20" },
        { id: 2, name: "Matrix Core optimization", members: ["Jordan", "Taylor"], progress: 82, status: "active", createdAt: "2024-03-15" },
        { id: 3, name: "Universal Auth Signal", members: ["Casey"], progress: 100, status: "completed", createdAt: "2024-03-10" },
      ];
      console.log("Response:", { success: true, count: 3, data: mockProjects });
      setProjects(mockProjects);
    }, 1000);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', members: '' });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    
    console.log("Calling API: POST /api/projects/create");
    console.log("Payload:", { name: newProject.name, members: newProject.members.split(',').map(m => m.trim()).filter(m => m) });
    
    setTimeout(() => {
      const project = {
        id: Date.now(),
        name: newProject.name,
        members: newProject.members.split(',').map(m => m.trim()).filter(m => m),
        progress: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      console.log("Response:", { success: true, message: "Project created", data: project });
      setProjects([project, ...projects]);
      setNewProject({ name: '', members: '' });
      setIsModalOpen(false);
    }, 800);
  };

  const updateProgress = (id, newProgress) => {
    const val = Math.max(0, Math.min(100, parseInt(newProgress) || 0));
    setProjects(projects.map(p => 
      p.id === id ? { ...p, progress: val, status: val === 100 ? 'completed' : 'active' } : p
    ));
  };

  const saveProgress = (id, progress) => {
    console.log(`Calling API: PUT /api/projects/progress/${id}`);
    console.log("Payload:", { progress });
    setTimeout(() => {
        console.log("Response:", { success: true, message: "Progress updated successfully" });
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <Layers size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Projects</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My <span className="text-stroke-accent">Projects</span></h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3 uppercase font-black tracking-[0.3em]">
            <Plus size={16} className="group-hover:rotate-180 transition-transform duration-500" /> 
            Add Project
          </span>
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10"></div>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: <Activity className="text-accent" /> },
          { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, icon: <CheckCircle2 className="text-green-500" /> },
          { label: 'Success Rate', value: '88%', icon: <TrendingUp className="text-blue-500" /> },
        ].map((stat, i) => (
          <div key={i} className="arch-card p-6 border-l-4 border-accent shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text/40">{stat.label}</span>
              <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
            </div>
            <div className="p-3 bg-background group-hover:bg-accent group-hover:text-white transition-all duration-500">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="arch-card p-8 flex flex-col justify-between group hover:border-accent transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center font-black text-white group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    {project.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className={`px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest border ${
                    project.status === 'completed' ? 'bg-green-50 text-accent border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter line-clamp-1 group-hover:text-accent transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-3">
                    <Users size={14} className="text-text/30" />
                    <div className="flex -space-x-2">
                      {project.members.map((m, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-primary border-2 border-white text-[8px] flex items-center justify-center font-black text-white hover:z-10 transition-all cursor-default" title={m}>
                          {m?.[0]}
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-text/30 uppercase tracking-widest px-2">{project.members.length} Members</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Progress</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={project.progress}
                        onChange={(e) => updateProgress(project.id, e.target.value)}
                        onBlur={() => saveProgress(project.id, project.progress)}
                        className="w-12 bg-background border border-border p-1 text-[10px] font-black text-center focus:outline-none focus:border-accent"
                      />
                      <span className="text-[10px] font-black uppercase text-white tracking-widest">%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-background border border-border overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full transition-colors duration-500 ${
                        project.progress === 100 ? 'bg-accent' : 'bg-accent'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Background Aesthetic */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 translate-x-16 -translate-y-16 rotate-45 group-hover:bg-accent/10 transition-all duration-500"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="arch-card w-full max-w-lg p-10 space-y-10 relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-text/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">New <span className="text-stroke-accent">Project</span></h2>
                <p className="text-[10px] font-bold text-text/40 uppercase tracking-[0.2em]">Add details for your new project.</p>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Project Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Project title"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="w-full bg-background border border-border p-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Team Members</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Alex, Sam"
                      value={newProject.members}
                      onChange={(e) => setNewProject({ ...newProject, members: e.target.value })}
                      className="w-full bg-background border border-border p-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="submit"
                    className="btn btn-outline flex-1 font-black uppercase tracking-[0.4em]"
                  >
                    Add
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 border-2 border-border text-[10px] font-black uppercase tracking-[0.2em] hover:bg-background transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectWorkspace;
