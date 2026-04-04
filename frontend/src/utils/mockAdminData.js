// TalentMatrix: Mock Administration Data Store

export const mockStudents = [
  { id: 'u1', name: 'James Wilson', email: 'james.w@stanford.edu', college: 'Stanford University', skills: ['React', 'Node.js'], score: 850, avatar: 'JW' },
  { id: 'u2', name: 'Elena Rodriguez', email: 'elena.r@mit.edu', college: 'MIT', skills: ['Python', 'AI/ML'], score: 920, avatar: 'ER' },
  { id: 'u3', name: 'Arjun Mehta', email: 'arjun.m@iitd.ac.in', college: 'IIT Delhi', skills: ['Blockchain', 'C++'], score: 780, avatar: 'AM' },
  { id: 'u4', name: 'Sarah Chen', email: 'sarah.c@berkeley.edu', college: 'UC Berkeley', skills: ['UI/UX', 'Figma'], score: 885, avatar: 'SC' },
  { id: 'u5', name: 'Liam O\'Brien', email: 'liam.o@ox.ac.uk', college: 'Oxford University', skills: ['Economics', 'Data Science'], score: 740, avatar: 'LO' },
  { id: 'u6', name: 'Yuki Sato', email: 'yuki.s@stanford.edu', college: 'Stanford University', skills: ['Kubernetes', 'Go'], score: 810, avatar: 'YS' },
  { id: 'u7', name: 'Amara Okafor', email: 'amara.o@mit.edu', college: 'MIT', skills: ['Robotics', 'Embedded C'], score: 895, avatar: 'AO' },
  { id: 'u8', name: 'David Smith', email: 'd.smith@harvard.edu', college: 'Harvard', skills: ['LegalTech', 'Ethics'], score: 670, avatar: 'DS' },
];

export const pendingVerifications = [
  { 
    id: 'v1', 
    studentName: 'James Wilson', 
    skill: 'Advanced React Architecture', 
    proof: 'https://github.com/jamesw/react-pattern-library', 
    proofType: 'GitHub',
    date: '2024-03-28' 
  },
  { 
    id: 'v2', 
    studentName: 'Arjun Mehta', 
    skill: 'Solidity Smart Contracts', 
    proof: 'https://credentials.example.com/blockchain-cert-442', 
    proofType: 'Certificate',
    date: '2024-03-30' 
  },
  { 
    id: 'v3', 
    studentName: 'Sarah Chen', 
    skill: 'Visual Design Systems', 
    proof: 'https://behance.net/sarah-chen/design-ops', 
    proofType: 'Portfolio',
    date: '2024-04-01' 
  },
  { 
    id: 'v4', 
    studentName: 'Amara Okafor', 
    skill: 'TensorFlow Optimization', 
    proof: 'https://github.com/amara-ai/tf-opt-edge', 
    proofType: 'GitHub',
    date: '2024-04-02' 
  }
];

export const adminAnalyticsData = {
  skillDistribution: [
    { label: 'Cloud Computing', value: 45, color: '#1B4332' },
    { label: 'Backend Development', value: 32, color: '#2D6A4F' },
    { label: 'AI & Data Science', value: 28, color: '#40916C' },
    { label: 'UI/UX Design', value: 18, color: '#95D5B2' },
    { label: 'Web Frontend', value: 55, color: '#D4AF37' }
  ],
  collaborationGrowth: [30, 45, 42, 60, 75, 90, 85, 110, 125, 140, 160, 185],
  topRequestedSkills: ['Rust', 'PyTorch', 'Next.js', 'Solidity', 'AWS'],
  activeStudentsByDay: [450, 520, 610, 580, 720, 890, 640]
};
