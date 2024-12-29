const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Notice = require('../models/Notice');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new notice
router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const { title, body } = req.body;
    const attachment = req.file ? req.file.path : null;

    const notice = new Notice({ title, body, attachment });
    const newNotice = await notice.save();

    res.status(201).json(newNotice);
  } catch (err) {
    console.error('Error creating notice:', err);
    res.status(400).json({ message: 'Error creating notice' });
  }
});

// Delete a notice
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Received DELETE request for ID: ${req.params.id}`);

    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      console.log('Notice not found');
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Handle file deletion
    if (notice.attachment) {
      console.log(`Attempting to delete file: ${notice.attachment}`);
      try {
        if (fs.existsSync(notice.attachment)) {
          fs.unlinkSync(notice.attachment); // Deletes the file
          console.log('File deleted successfully');
        } else {
          console.log('File not found, skipping deletion');
        }
      } catch (fileError) {
        console.error('Error deleting file:', fileError);
      }
    }

    // Delete the notice from the database
    await Notice.findByIdAndDelete(req.params.id);
    console.log('Notice deleted successfully');
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
