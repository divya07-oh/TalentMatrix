const Collaboration = require('../models/Collaboration');
const User = require('../models/User');
const { addNotification } = require('../utils/notificationService');

// POST /api/collaboration/send
// Send a collaboration request
exports.sendRequest = async (req, res) => {
  try {
    const { senderId, receiverId, message, skill } = req.body;

    // Validate required fields
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "senderId and receiverId are required." });
    }

    // Prevent self-request
    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "Cannot send a collaboration request to yourself." });
    }

    // Validate users exist
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);

    if (!senderUser) {
      return res.status(404).json({ message: "Sender not found." });
    }
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    // Prevent duplicate requests (if there is already a pending or accepted request between them)
    const existingRequest = await Collaboration.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A collaboration request already exists between these users." });
    }

    // Create new request
    const newRequest = new Collaboration({
      senderId,
      receiverId,
      message: message || '',
      skill: skill || '',
      status: 'pending'
    });

    await newRequest.save();

    // Trigger Notifications
    await addNotification("admin", "A new collaboration request was created", "collaboration", "admin");
    await addNotification(receiverId, "You received a collaboration request", "collaboration", "student");

    return res.status(201).json({
      message: "Collaboration request sent successfully.",
      data: newRequest
    });
  } catch (error) {
    console.error("Send Collaboration Request Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// GET /api/collaboration/user/:userId
// Return sent and received requests (or all for admins)
exports.getUserRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Identify user role
    const requestUser = await User.findById(userId);
    if (!requestUser) {
      return res.status(404).json({ message: "Requesting user not found." });
    }

    let userRequests;
    if (requestUser.role === 'admin') {
      // Admins see EVERYTHING
      userRequests = await Collaboration.find({})
        .populate('senderId', 'name email')
        .populate('receiverId', 'name email')
        .sort({ createdAt: -1 });
    } else {
      // Students only see their relevant nodes
      userRequests = await Collaboration.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      })
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email')
      .sort({ createdAt: -1 });
    }

    const sent = userRequests.filter(req => req.senderId?._id?.toString() === userId.toString());
    const received = userRequests.filter(req => req.receiverId?._id?.toString() === userId.toString());
    const all = requestUser.role === 'admin' ? userRequests : [];

    return res.status(200).json({
      message: "Collaboration requests retrieved successfully.",
      data: {
        sent,
        received,
        all // New field for admin overview
      }
    });
  } catch (error) {
    console.error("Get User Requests Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// PUT /api/collaboration/respond/:id
// Accept or reject a request
exports.respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'accepted' or 'rejected'." });
    }

    const collaboration = await Collaboration.findById(id);

    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration request not found." });
    }

    if (collaboration.status !== 'pending') {
      return res.status(400).json({ message: `Request has already been ${collaboration.status}.` });
    }

    collaboration.status = status;
    await collaboration.save();

    if (status === 'accepted') {
      await addNotification(collaboration.senderId, "Your collaboration request was accepted", "collaboration", "student");
    }

    return res.status(200).json({
      message: `Collaboration request ${status}.`,
      data: collaboration
    });
  } catch (error) {
    console.error("Respond To Request Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
