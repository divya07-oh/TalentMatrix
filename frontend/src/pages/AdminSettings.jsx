import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Globe, 
  Mail, 
  MapPin, 
  Save, 
  ShieldCheck,
  Server,
  Database
} from 'lucide-react';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeDomain: '',
    adminEmail: '',
    description: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    console.log("Calling API: GET /api/admin/settings");
    setTimeout(() => {
       const mockSettings = {
         collegeName: 'Matrix Institute of Technology',
         collegeDomain: 'mit.edu.in',
         adminEmail: 'principal@mit.edu.in',
         description: 'A leading technology institute specializing in computer science research and engineering.'
       };
       console.log("Response:", { success: true, data: mockSettings });
       setFormData(mockSettings);
    }, 1000);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    console.log("Calling API: PUT /api/admin/settings");
    console.log("Payload:", formData);
    
    // Simulate API delay
    setTimeout(() => {
      console.log("Response:", { success: true, message: "Settings updated successfully" });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-transform duration-500 hover:scale-105">
            <Settings size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Settings</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Settings</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Main Settings Form Sector */}
        <div className="xl:col-span-2 space-y-8">
          <div className="arch-card p-10 space-y-10 relative overflow-hidden group shadow-xl">
             <div className="absolute inset-0 grid-pattern-subtle opacity-5 pointer-events-none"></div>
             
             <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                   <div className="w-10 h-10 border border-border flex items-center justify-center text-accent bg-accent/5"><Globe size={20} /></div>
                   <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">College Info</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block ml-1">College Name</label>
                      <div className="relative">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-border bg-background text-white"><MapPin size={14} /></div>
                         <input 
                            type="text" 
                            value={formData.collegeName}
                            onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                            className="w-full bg-background border border-border p-4 pl-16 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                            placeholder="College Name..."
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block ml-1">Domain</label>
                      <div className="relative">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-border bg-background text-white"><Globe size={14} /></div>
                         <input 
                            type="text" 
                            value={formData.collegeDomain}
                            onChange={(e) => setFormData({...formData, collegeDomain: e.target.value})}
                            className="w-full bg-background border border-border p-4 pl-16 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                            placeholder="mit.edu..."
                         />
                      </div>
                   </div>

                   <div className="space-y-2 md:col-span-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block ml-1">Admin Email</label>
                      <div className="relative">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 border border-border bg-background text-white"><Mail size={14} /></div>
                         <input 
                            type="email" 
                            value={formData.adminEmail}
                            onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                            className="w-full bg-background border border-border p-4 pl-16 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                            placeholder="admin@college.com..."
                         />
                      </div>
                   </div>

                   <div className="space-y-2 md:col-span-2 mt-4">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block ml-1">About College (Description)</label>
                      <div className="relative">
                         <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-background border border-border p-4 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all h-32 resize-none"
                            placeholder="Enter description..."
                         ></textarea>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors ${saveSuccess ? 'bg-accent animate-pulse' : 'bg-primary/20'}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text/30">
                         {isSaving ? 'Saving...' : saveSuccess ? 'Saved' : 'Ready'}
                      </span>
                   </div>
                   <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn btn-primary font-black uppercase tracking-[0.4em] flex items-center gap-3 group disabled:opacity-50"
                   >
                      {isSaving ? 'Saving...' : <><Save size={16} /> Save</>}
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* System Diagnostics Sector */}
        <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border pb-4">
               <ShieldCheck size={18} className="text-white" />
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Security</h3>
            </div>

            <div className="arch-card bg-primary p-8 space-y-8 relative overflow-hidden group border-b-8 border-accent">
               <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none"></div>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent"><Server size={24} /></div>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Status</span>
                  </div>
                  <div className="space-y-2">
                     <p className="text-3xl font-black text-white uppercase italic tracking-tighter">SECURE</p>
                     <div className="h-1 w-full bg-primary/10 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-accent w-[85%] animate-pulse"></div>
                     </div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white">
                     <span>Node: AP-NORTH-1</span>
                     <span>98.4% Health</span>
                  </div>
               </div>
               <button className="btn btn-secondary w-full font-black uppercase tracking-[0.4em] relative z-10">
                  Access Security Logs
               </button>
            </div>


        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
