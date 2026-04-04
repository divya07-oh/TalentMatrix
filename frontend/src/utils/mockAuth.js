import { colleges } from '../data/colleges';
import { adminWhitelist } from '../data/adminWhitelist';

// Simulated Backend Framework for TalentMatrix
const STORAGE_KEYS = {
  INVITES: 'matrix_invites',
  USERS: 'matrix_users',
  SKILLS: 'matrix_skills',
  COLLAB_REQUESTS: 'matrix_collab_requests',
  NOTIFICATIONS: 'matrix_notifications'
};

/**
 * Seeds the initial invitation node for testing.
 */
export const initializeMockData = () => {
  const existingInvites = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITES) || '[]');
  
  if (existingInvites.length === 0) {
    const seedInvites = [
      {
        token: 'valid-token-123',
        email: 'admin@stanford.edu',
        collegeId: 'stanford',
        status: 'pending'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.INVITES, JSON.stringify(seedInvites));
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const hasAdmin = users.some(u => u.email === 'admin@stanford.edu');
  const hasStudent = users.some(u => u.email === 'alex@stanford.edu');

  if (!hasAdmin || !hasStudent) {
    const seedUsers = [];
    if (!hasAdmin) seedUsers.push({
      id: 'user_admin_1',
      email: 'admin@stanford.edu',
      password: 'admin123',
      fullName: 'Stanford Admin',
      role: 'admin',
      collegeId: 'stanford',
      collegeName: 'Stanford University'
    });
    if (!hasStudent) seedUsers.push({
      id: 'user_student_1',
      email: 'alex@stanford.edu',
      password: 'password123',
      fullName: 'Alex Johnson',
      role: 'student',
      collegeId: 'stanford',
      collegeName: 'Stanford University',
      verifiedSkills: ['React', 'CSS Architecture']
    });
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, ...seedUsers]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.COLLAB_REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.COLLAB_REQUESTS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
  }
};

// --- USER UTILITIES ---

export const getCurrentUser = () => {
  // Since we only store IDs in localStorage for simplicity in this mock, 
  // we find the full user object from the USERS list.
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return null;
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  return users.find(u => u.email === userEmail);
};

export const registerUnifiedUser = (userData) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const emailLower = userData.email.toLowerCase();
  const emailDomain = emailLower.split('@')[1];

  const college = colleges.find(c => c.domain === emailDomain);
  if (!college) throw new Error('invalid_domain');

  const isAdmin = adminWhitelist.some(adminEmail => adminEmail.toLowerCase() === emailLower);
  const role = isAdmin ? 'admin' : 'student';

  const newUser = {
    ...userData,
    email: emailLower,
    id: `user_${Date.now()}`,
    role,
    collegeId: college.id,
    collegeName: college.name,
    verifiedSkills: []
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem('userEmail', emailLower); 
  
  // Notify Admin of new registration
  addNotification('admin_node', 'admin', 'registration', `New student node initialized: ${newUser.fullName} (${newUser.collegeName})`, 'user');
  
  return newUser;
};

export const verifyLogin = (email, password) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('userEmail', user.email);
  }
  return user;
};

// --- SKILL UTILITIES ---

export const getSkills = (userId) => {
  const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
  return skills.filter(s => s.userId === userId);
};

export const getAllPendingSkills = () => {
  const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
  return skills.filter(s => s.status === 'pending');
};

export const addSkill = (userId, skillName, userEmail) => {
  const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
  const newSkill = {
    id: `skill_${Date.now()}`,
    userId,
    userEmail,
    name: skillName,
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  skills.push(newSkill);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  
  // Notify Admin of new skill submission
  addNotification('admin_node', 'admin', 'skill_submission', `New technical node submitted for verification: ${skillName} from ${userEmail}`, 'zap');
  
  return newSkill;
};

export const updateSkillStatus = (skillId, status) => {
  const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
  const updatedSkills = skills.map(s => 
    s.id === skillId ? { ...s, status } : s
  );
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updatedSkills));
  
  const skill = skills.find(s => s.id === skillId);

  // If approved, add to user's verifiedSkills list
  if (status === 'verified') {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const updatedUsers = users.map(u => 
      u.id === skill.userId ? { ...u, verifiedSkills: [...(u.verifiedSkills || []), skill.name] } : u
    );
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
  }

  // Notify Student of skill status update
  const message = status === 'verified' 
    ? `Technical node [${skill.name}] has been verified by the institution. ✅` 
    : `Technical node [${skill.name}] verification was rejected. ❌`;
  
  addNotification(skill.userId, 'student', 'status_update', message, status === 'verified' ? 'shield' : 'x');
};

// --- COLLABORATION UTILITIES ---

export const sendCollabRequest = (fromUserId, toUserId, message) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLAB_REQUESTS) || '[]');
  const newRequest = {
    id: `req_${Date.now()}`,
    fromUserId,
    toUserId,
    message,
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  requests.push(newRequest);
  localStorage.setItem(STORAGE_KEYS.COLLAB_REQUESTS, JSON.stringify(requests));
  
  // Notify receiver of collaboration request
  const fromUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]').find(u => u.id === fromUserId);
  addNotification(toUserId, 'student', 'collab_request', `New collaboration invite from ${fromUser?.fullName || 'a student'}. 🤝`, 'message');
  
  return newRequest;
};

export const getCollabRequests = (userId) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLAB_REQUESTS) || '[]');
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  return requests.filter(r => r.toUserId === userId).map(r => {
    const sender = users.find(u => u.id === r.fromUserId);
    return { ...r, senderName: sender ? sender.institutionName : 'Unknown' };
  });
};

export const updateCollabStatus = (requestId, status) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.COLLAB_REQUESTS) || '[]');
  const updatedRequests = requests.map(r => 
    r.id === requestId ? { ...r, status } : r
  );
  localStorage.setItem(STORAGE_KEYS.COLLAB_REQUESTS, JSON.stringify(updatedRequests));

  // Notify sender when request is accepted
  if (status === 'accepted') {
    const req = requests.find(r => r.id === requestId);
    const toUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]').find(u => u.id === req.toUserId);
    addNotification(req.fromUserId, 'student', 'collab_accepted', `Your collaboration request was accepted by ${toUser?.fullName || 'the student'}! 🎉`, 'star');
  }
};

export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
};

// --- INVITE UTILITIES ---

export const getInvite = (token) => {
  const invites = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITES) || '[]');
  return invites.find(inv => inv.token === token);
};

export const createAdminAccount = (token, userData) => {
  const invites = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVITES) || '[]');
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');

  const updatedInvites = invites.map(inv => 
    inv.token === token ? { ...inv, status: 'used' } : inv
  );
  localStorage.setItem(STORAGE_KEYS.INVITES, JSON.stringify(updatedInvites));

  const newUser = {
    ...userData,
    role: 'admin',
    id: `user_${Date.now()}`
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem('userEmail', newUser.email);

  return newUser;
};

// --- NOTIFICATION UTILITIES ---

export const addNotification = (userId, role, type, message, iconType = 'bell') => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  const newNotif = {
    id: `notif_${Date.now()}`,
    userId,
    role, // 'student' or 'admin'
    type,
    message,
    iconType,
    isRead: false,
    timestamp: new Date().toISOString()
  };
  notifications.unshift(newNotif); // Newest first
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  return newNotif;
};

export const getNotifications = (userId, role) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  return notifications.filter(n => (role === 'admin' ? n.role === 'admin' : (n.userId === userId && n.role === 'student')));
};

export const markAsRead = (notifId) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  const updated = notifications.map(n => n.id === notifId ? { ...n, isRead: true } : n);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
};

export const markAllAsRead = (userId, role) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  const updated = notifications.map(n => {
    if (role === 'admin' ? n.role === 'admin' : (n.userId === userId && n.role === 'student')) {
      return { ...n, isRead: true };
    }
    return n;
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
};

export const clearAllNotifications = (userId, role) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  const remaining = notifications.filter(n => {
    if (role === 'admin') return n.role !== 'admin';
    return n.userId !== userId || n.role !== 'student';
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(remaining));
};
