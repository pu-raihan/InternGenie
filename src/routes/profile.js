import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        skills: user.skills || [],
        interests: user.interests || [],
        resume: user.resume || null
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  try {
    const { skills, interests } = req.body;
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update skills and interests if provided
    if (skills && skills.length!=0) user.skills = skills;
    if (interests && interests.length!=0) user.interests = interests;

    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        skills: user.skills || [],
        interests: user.interests || [],
        resume: user.resume || null
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload resume
router.post('/resume', auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resumeUrl = req.body.resumeUrl;

    user.resume = {
      url: resumeUrl,
      filename: req.body.file.name,
      size: req.body.file.size,
      type: req.body.file.type,
      uploadedAt: new Date()
    };

    await user.save();

    res.json({
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Download resume
router.get('/resume/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user?.resume?.url) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.redirect(user.resume.url);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Server error" });
  }
});

export default router; 