import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function migrateResumeSchema() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all users with old resume schema
    const result = await User.updateMany(
      { resume: { $exists: true } },
      {
        $set: {
          'resume.url': null,
          'resume.size': null,
          'resume.type': null
        },
        $unset: {
          'resume.path': 1
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} documents`);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

migrateResumeSchema(); 