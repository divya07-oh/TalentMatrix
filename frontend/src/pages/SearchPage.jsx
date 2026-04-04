import React, { useState, useEffect } from 'react';
import { Search, MapPin, Award, UserPlus, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { getAllUsers, sendCollabRequest, getCurrentUser } from '../utils/mockAuth';
import './SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    setTimeout(() => {
      const allUsers = getAllUsers();
      // Don't show current user in search
      const user = getCurrentUser();
      setUsers(allUsers.filter(u => u.id !== user?.id));
      setIsLoading(false);
    }, 800);
  };

  const handleInvite = (recipient) => {
    if (!currentUser) {
      addToast('Please login to send invites', 'error');
      return;
    }
    sendCollabRequest(currentUser.id, recipient.id, `Request to collaborate from ${currentUser.institutionName}`);
    addToast(`Invitation sent to ${recipient.institutionName}!`, 'success');
  };

  const filteredUsers = users.filter(u => 
    u.institutionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.verifiedSkills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="search-page-container">
      <header className="content-header">
        <h1>Institutional Skill Search</h1>
        <p>Discover verified talent across the academic matrix based on your node requirements.</p>
      </header>

      <div className="search-interface">
        <div className="search-bar-lg">
          <Search size={24} className="search-icon-lg" />
          <input 
            type="text" 
            placeholder="Search skills (e.g. React, AI) or Institutions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-matrix-primary">Sync</button>
        </div>
      </div>

      <div className="search-results-info">
        <h3>Found {filteredUsers.length} Active Nodes</h3>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <Loader2 className="spinner" size={40} />
          <p>Scanning global registry...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} className="opacity-20" />
          <h3>No Matching Nodes</h3>
          <p>No students found with those specific skill signatures in the current sector.</p>
        </div>
      ) : (
        <div className="results-grid">
          {filteredUsers.map(person => (
            <div key={person.id} className="person-card-lg glimmer-hover">
              <div className="person-top-row">
                <div className="avatar-med">
                  {person.institutionName?.split(' ').map(n=>n[0]).slice(0,2).join('')}
                </div>
                <div className="card-main-info">
                  <h4>{person.institutionName}</h4>
                  <div className="location">
                    <MapPin size={14} />
                    <span>{person.collegeName || 'Verified Institution'}</span>
                  </div>
                </div>
                <div className="ssi-score-badge">
                   <Award size={16} />
                   <span>85%</span>
                </div>
              </div>
              
              <div className="skill-tags-lg">
                {(person.verifiedSkills || []).map(skill => (
                  <span key={skill} className="tag-lg">{skill}</span>
                ))}
                {(person.verifiedSkills || []).length === 0 && (
                  <span className="tag-lg opacity-40">No Verified Skills Yet</span>
                )}
              </div>

              <button 
                className="btn-matrix-primary btn-full"
                onClick={() => handleInvite(person)}
              >
                <UserPlus size={18} />
                <span>Invite to Collaborate</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
