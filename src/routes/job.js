import express from 'express';
import Job from '../models/Job.js';
import { getEmbedding, getJobMatches } from '../utils/embeddings.js';
import { parseResume } from '../utils/resumeParser.js';
import { auth } from '../middleware/auth.js';
import fetch from 'node-fetch';

const router = express.Router();

// Get jobs
router.get('/', async (req, res) => {
  try {
    // Extract filters from query params
    const { title, company, location } = req.query;

    // Build filter object dynamically
    const filters = {};
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (company) filters.company = { $regex: company, $options: 'i' };
    if (location) filters.location = { $regex: location, $options: 'i' };

    const jobs = await Job.find(filters);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/match', auth, async (req, res) => {
  try {
    const { skills, interests } = req.user;

    if (!skills || !interests) {
      return res.status(400).json({ error: 'Skills and interests are required' });
    }

    // Parse resume if provided
    let resumeText = '';
    if (req.user.resume && req.user.resume.url) {
      try {
        const response = await fetch(req.user.resume.url);
        const buffer = await response.arrayBuffer();
        resumeText = await parseResume(buffer);
        console.log('resumeText',resumeText);
        
      } catch (error) {
        console.error('Error fetching resume:', error);
        return res.status(500).json({
          error: 'Error fetching resume file',
          details: error.message
        });
      }
    }

    // Combine all text for embedding
    const combinedText = [
      ...skills,
      ...interests,
      resumeText
    ].filter(Boolean).join(' ');

    // Get embedding for user input
    const userVector = await getEmbedding(combinedText);

    // Fetch all jobs from database
    const jobs = await Job.find({});

    // Get top matches
    const matches = await getJobMatches(userVector, jobs);

    res.json({
      matches,
      count: matches.length,
      message: 'Successfully found job matches'
    });

  } catch (error) {
    console.error('Error in match route:', error);
    res.status(500).json({
      error: 'Error processing match request',
      details: error.message
    });
  }
});

export default router; 