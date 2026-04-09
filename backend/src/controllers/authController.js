const User = require('../models/User');
const { addNotification } = require('../utils/notificationService');

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    let { name, email, password, collegeId } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    
    // 1. Basic email normalization
    email = email.toLowerCase().trim();

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // 2. Determine Role: trust frontend role field if provided, else detect from email
    const isAdminEmail = email.startsWith('admin@');
    const role = (req.body.role === 'admin' || isAdminEmail) ? 'admin' : 'student';

    // 3. Handle College ID requirement
    // Admins don't need to specify a college, we give them a default node
    const finalCollegeId = (role === 'admin' && !collegeId) ? 'ADMIN-HQ' : collegeId;

    if (!name || !password || !finalCollegeId) {
      return res.status(400).json({ message: "Name, password, and college are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const newUser = new User({
      name,
      email,
      password, // Note: hash in production
      role,
      collegeId: finalCollegeId
    });

    await newUser.save();

    if (role === 'student') {
      await addNotification("admin", "A new student has registered", "system", "admin");
    }

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error during signup." });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    email = email.toLowerCase().trim();

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Traditional Login (Mongoose)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Account not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error during login." });
  }
};
