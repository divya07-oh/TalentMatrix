import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getCollabRequests, updateCollabStatus, getCurrentUser } from '../utils/mockAuth';
import './CollaborationPage.css';

const CollaborationPage = () => {
  const { addToast } = useToast();
  const [incoming, setIncoming] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadRequests(user.id);
    }
  }, []);

  const loadRequests = (userId) => {
    setIsLoading(true);
    setTimeout(() => {
      const reqs = getCollabRequests(userId);
      setIncoming(reqs);
      setIsLoading(false);
    }, 800);
  };

  const handleAction = (id, status, senderName) => {
    updateCollabStatus(id, status);
    addToast(status === 'accepted' ? `Collaboration with ${senderName} accepted!` : `Invitation declined.`, status === 'accepted' ? 'success' : 'info');
    loadRequests(currentUser.id);
  };

  return (
    <div className="collab-page-container">
      <header className="content-header">
        <h1>Collaboration Requests</h1>
        <p>Manage your incoming partnerships and track your sent invitations.</p>
      </header>

      <div className="collab-grid">
        <section className="collab-section">
          <h2>Institutional Incoming Requests</h2>
          
          {isLoading ? (
            <div className="loading-state">
              <Loader2 className="spinner" size={40} />
              <p>Syncing nodes...</p>
            </div>
          ) : incoming.length === 0 ? (
            <div className="empty-state">
              <AlertCircle size={48} className="opacity-20" />
              <p>No active collaboration nodes detected in your institutional sector.</p>
            </div>
          ) : (
            <div className="collab-list">
              <AnimatePresence>
                {incoming.map(req => (
                  <motion.div 
                    key={req.id} 
                    className="collab-card glimmer-hover"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="collab-card-header">
                      <div className="avatar-sm">
                        {req.senderName.split(' ').map(n=>n[0]).slice(0,2).join('')}
                      </div>
                      <div className="header-info">
                        <h4>{req.senderName}</h4>
                        <span className="college-tag">External Institution</span>
                      </div>
                      <span className="date-text">PENDING</span>
                    </div>
                    <div className="collab-card-body">
                      <p>{req.message}</p>
                    </div>
                    {req.status === 'pending' ? (
                      <div className="collab-card-actions">
                        <button 
                          className="btn-matrix-primary accept-btn"
                          onClick={() => handleAction(req.id, 'accepted', req.senderName)}
                        >
                           <CheckCircle size={18} />
                           <span>Accept Node</span>
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleAction(req.id, 'rejected', req.senderName)}
                        >
                           <XCircle size={18} />
                           <span>Decline</span>
                        </button>
                      </div>
                    ) : (
                      <div className="status-confirmed">
                        <CheckCircle size={16} />
                        <span>Node Status: {req.status.toUpperCase()}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <section className="collab-section">
          <h2>Outgoing Synchronizations</h2>
          <div className="empty-state-small">
            <p>Initiate a new connection via Skill Search to track outgoing requests.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollaborationPage;
