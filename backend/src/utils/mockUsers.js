// Simulated database for users
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@talentmatrix.com',
    password: 'password123', 
    role: 'admin'
  },
  {
    id: "s-1712156828551",
    name: "Alex",
    email: "alex@mit.edu",
    password: "password123",
    role: "student",
    collegeId: "mit"
  },
  {
    id: "s-1712156828552",
    name: "Sam",
    email: "sam@stanford.edu",
    password: "password123",
    role: "student",
    collegeId: "stanford"
  }
];

module.exports = mockUsers;
