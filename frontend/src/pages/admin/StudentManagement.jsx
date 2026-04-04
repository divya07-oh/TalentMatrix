import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  GraduationCap, 
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllUsers } from '../../utils/mockAuth';
import './StudentManagement.css';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCollege, setFilterCollege] = useState('All');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const collegesList = ['All', 'Stanford University', 'MIT', 'IIT Delhi', 'UC Berkeley', 'Oxford University', 'Harvard'];

  useEffect(() => {
    const allUsers = getAllUsers();
    setStudents(allUsers.filter(u => u.role === 'student'));
    setIsLoading(false);
  }, []);

  const filteredStudents = students.filter(student => {
    const name = student.fullName || 'Unknown Student';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = filterCollege === 'All' || student.collegeName === filterCollege;
    return matchesSearch && matchesCollege;
  });

  return (
    <div className="student-management-container">
      <header className="management-header">
        <div className="admin-title-section">
          <h1>Student Directory</h1>
          <p>Manage, search, and monitor student progress across institutions.</p>
        </div>
        <button className="btn-matrix-primary">
          <Users size={18} />
          <span>Export Data</span>
        </button>
      </header>

      <section className="search-filter-row">
        <div className="search-input-wrapper">
          <Search className="search-icon-mgmt" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME OR EMAIL..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} className="text-matrix-accent opacity-60" />
          <select 
            className="filter-select"
            value={filterCollege}
            onChange={(e) => setFilterCollege(e.target.value)}
          >
            {collegesList.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </div>
      </section>

      <div className="students-table-card">
        <table className="students-table">
          <thead>
            <tr>
              <th>Identification</th>
              <th>Institution</th>
              <th>Expertise (Verified)</th>
              <th>Score</th>
              <th>System Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredStudents.map((student, i) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <td>
                    <div className="student-info-cell">
                      <div className="student-details">
                        <span className="st-name">{student.fullName}</span>
                        <span className="st-email">{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 opacity-80">
                      <GraduationCap size={16} className="text-matrix-accent" />
                      <span className="text-xs uppercase tracking-wider">{student.collegeName || 'Verified Node'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="skills-tags">
                      {(student.verifiedSkills || []).map(s => <span key={s} className="skill-tag-pill">{s}</span>)}
                      {(student.verifiedSkills || []).length === 0 && <span className="opacity-40 text-[10px]">NO VERIFIED NODES</span>}
                    </div>
                  </td>
                  <td>
                    <span className="score-badge">{student.score}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn-sm" title="Profile">
                        <ExternalLink size={18} />
                      </button>
                      <button className="action-btn-sm" title="Contact">
                        <Mail size={18} />
                      </button>
                      <button className="action-btn-sm delete" title="Revoke">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="bg-matrix-bg p-20 text-center opacity-40 flex flex-col items-center gap-4">
            <Users size={64} className="opacity-20" />
            <p className="font-mono text-xs uppercase tracking-widest">No matching records found in matrix</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
