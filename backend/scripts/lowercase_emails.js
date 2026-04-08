const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const lowercaseEmails = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for migration');

    const users = await User.find({});
    console.log(`Found ${users.length} users to check`);

    let updatedCount = 0;
    for (const user of users) {
      const lowerEmail = user.email.toLowerCase().trim();
      if (user.email !== lowerEmail) {
        user.email = lowerEmail;
        await user.save();
        updatedCount++;
      }
    }

    console.log(`Migration complete. ${updatedCount} users updated.`);
    process.exit(0);
  } catch (error) {
    console.error(`Migration Failed: ${error.message}`);
    process.exit(1);
  }
};

lowercaseEmails();
