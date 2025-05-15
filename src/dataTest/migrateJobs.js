import mongoose from 'mongoose';
import Job from '../models/Job.js'; // Adjust path as needed
import 'dotenv/config';


// Random value generators
const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Freelance'];
const modes = ['On-site', 'Remote', 'Hybrid'];

function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function populateRandomValues() {
  try {
    // Get all existing jobs
    const jobs = await Job.find({});

    // Update each job with random values
    for (const job of jobs) {
      job.jobType = getRandomValue(jobTypes);
      job.mode = getRandomValue(modes);
      await job.save();
    }

    console.log(`Successfully updated ${jobs.length} jobs with random jobType and mode`);
  } catch (error) {
    console.error('Error updating jobs:', error);
  } finally {
    mongoose.disconnect();
  }
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  populateRandomValues();
} catch (err) {
  console.error(err);
}