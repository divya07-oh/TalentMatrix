const mockUsers = require('../utils/mockUsers');
const { addNotification } = require('../utils/notificationService');


const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Check for empty fields
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required." });
  }
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email is required." });
  }
  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Check if email already exists
  const userExists = mockUsers.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User with this email already exists." });
  }

  // Assign role: admin if admin@college.edu, else student
  const isAdminEmail = email.startsWith('admin@') && email.endsWith('.edu');
  const role = isAdminEmail ? 'admin' : 'student';

  // Save new user (simulated)
  const newUser = {
    id: mockUsers.length + 1,
    name,
    email,
    password, 
    role
  };

  mockUsers.push(newUser);

  if (role === 'student') {
    addNotification(1, "A new student has registered", "system", "admin");
  }

  // Return success response without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    message: "User registered successfully.",
    user: userWithoutPassword
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email is required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Check for dynamic roles (e.g., admin@college.edu vs alex@college.edu)
  const isAdminEmail = email.startsWith('admin@') && email.endsWith('.edu');
  const isStudentDomain = email.endsWith('.edu') && !isAdminEmail;

  if (isStudentDomain) {
    // Student Login - Passwordless/Domain-Based
    const [namePart, domain] = email.split('@');
    const college = domain.split('.')[0];

    return res.status(200).json({
      message: "Student login successful via college domain.",
      user: {
        id: `s-${Date.now()}`,
        name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
        role: "student",
        college: college.toUpperCase()
      }
    });
  }

  // Traditional Admin Login
  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required for admin login." });
  }

  // Find admin by email
  const user = mockUsers.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "Admin account not found." });
  }

  // Validate admin password
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid admin password." });
  }

  // Return success response with admin details
  res.status(200).json({
    message: "Admin login successful.",
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });
};
