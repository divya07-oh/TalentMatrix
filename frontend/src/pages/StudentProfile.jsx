import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Layers, 
  MapPin, 
  Info, 
  PlusCircle, 
  Rocket, 
  FileText, 
  CheckCircle2,
  Clock,
  MoreVertical,
  Mail,
  Phone
} from 'lucide-react';

import API from '../api';
import { getUser } from '../utils/getUser';

const StudentProfile = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/skills/user/${user._id}`);
        setSkills(response.data.skills.map(s => ({
          id: s._id,
          name: s.skillName,
          repo: s.githubLink,
          status: s.status,
          date: new Date(s.createdAt).toISOString().split('T')[0]
        })));
      } catch (error) {
        console.error("Fetch Skills Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [user?._id]);

  const [newSkill, setNewSkill] = useState({ name: '', repo: '', file: null });
  const [submitting, setSubmitting] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImg(url);
    }
  };

  const handleFileChange = (e) => {
    setNewSkill({ ...newSkill, file: e.target.files[0] });
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.repo || !newSkill.file || !user) return;
    
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('userId', user._id);
      formData.append('skillName', newSkill.name);
      formData.append('projectRepoLink', newSkill.repo);
      formData.append('certificate', newSkill.file);

      const response = await API.post('/skills/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const s = response.data.skill;
      const addedSkill = {
        id: s._id,
        name: s.skillName,
        repo: s.githubLink,
        status: s.status,
        date: new Date(s.createdAt).toISOString().split('T')[0]
      };
      
      setSkills([...skills, addedSkill]);
      setNewSkill({ name: '', repo: '', file: null });
    } catch (error) {
      console.error("Add Skill Error:", error);
      alert(error.response?.data?.message || "Failed to add skill.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Student Details Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="arch-card p-10 grid grid-cols-1 lg:grid-cols-3 gap-12 border-l-8 border-l-primary"
      >
        <div className="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
          <div className="w-32 h-32 border-4 border-primary p-2 bg-background ring-4 ring-accent/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            {profileImg || user?.profileImage ? (
               <img src={profileImg || user?.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <UserCircle size={64} className="text-white" />
            )}
            <input type="file" onChange={handleProfileImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-[10px] font-black uppercase text-accent tracking-widest">Upload</span>
            </div>
          </div>
          <div className="text-center lg:text-left space-y-1">
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">{user?.name || 'User Name'}</h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">{user?.role || 'Student'}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/40">
                   <Layers size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">College</span>
                </div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{user?.collegeId || 'Not Specified'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/40">
                   <MapPin size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Department</span>
                </div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{user?.department || 'General'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/40">
                   <Mail size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Official Email</span>
                </div>
                <input 
                  type="email" 
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-background/50 border border-border/80 p-3 text-sm font-bold text-white uppercase tracking-wider cursor-not-allowed rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/40">
                   <Phone size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Registration Status</span>
                </div>
                <div className="p-3 bg-background/30 border border-border/80 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                   Active Node Verified
                </div>
              </div>
           </div>

           <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                 <Info size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">About Me</span>
              </div>
              <p className="text-sm font-medium text-text/70 leading-relaxed max-w-2xl bg-background p-6 border border-border italic">
                I build modern websites with React and focus on great design. I love working with students from other colleges.
              </p>
           </div>
        </div>
      </motion.div>

      {/* Add Skill Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <PlusCircle size={20} className="text-accent" />
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white">Add New Skill</h2>
        </div>

        <div className="arch-card p-10">
          <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Skill Name</label>
              <input 
                required
                type="text" 
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g. Node.js"
                className="w-full bg-background border border-border/80 p-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Git Repo</label>
              <div className="relative">
                <Rocket size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  required
                  type="text" 
                  value={newSkill.repo}
                  onChange={(e) => setNewSkill({ ...newSkill, repo: e.target.value })}
                  placeholder="github.com/user/project"
                  className="w-full bg-background border border-border/80 p-4 pl-12 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-focus-within:text-accent transition-colors">Project File</label>
              <div className="relative h-[55px] group">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                <div className="absolute inset-0 bg-background border border-border/80 border-dashed p-4 flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-widest z-10 transition-all rounded-md group-hover:border-accent group-hover:bg-accent/[0.02]">
                   <span className="truncate">{newSkill.file ? newSkill.file.name : 'Choose File'}</span>
                   <FileText size={16} className={`transition-colors ${newSkill.file ? 'text-accent' : 'group-hover:text-accent'}`} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 pt-4">
              <button 
                disabled={submitting || !newSkill.name}
                className="btn btn-primary tracking-[0.4em] disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Skill List Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 size={20} className="text-white" />
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white">My Skills</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill) => (
                <motion.div 
                   key={skill.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="arch-card p-10 flex flex-col justify-between group hover:border-accent transition-all duration-500"
                >
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-white group-hover:bg-accent group-hover:text-white transition-colors">
                         <Rocket size={18} />
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border ${
                        skill.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-accent/5 text-accent border-accent/20'
                      }`}>
                         {skill.status}
                      </span>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">{skill.name}</h3>
                         <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest truncate">{skill.repo}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                         <div className="flex items-center gap-2 text-text/30">
                            <Clock size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{skill.date}</span>
                         </div>
                         <button className="btn btn-secondary">
                            <MoreVertical size={16} />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
