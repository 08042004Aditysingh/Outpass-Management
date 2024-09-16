// routes/passRoutes.js
const express = require('express');
const router = express.Router();
const Leave = require('./leave.js');
const Outpass = require('./outpass.js');

// Route for submitting Leave
router.post('/leave', async (req, res) => {
  try {
    const { name, regNo, date, counselor, newclass} = req.body;

    const newLeave = new Leave({
      name,
      regNo,
      date,
      counselor,
      newclass
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting leave request', details: err });
  }
});

// Route for submitting Outpass
router.post('/outpass', async (req, res) => {
  try {
    const { name, regNo, startDate, endDate, newclass} = req.body;

    const newOutpass = new Outpass({
      name,
      regNo,
      startDate,
      endDate,
      newclass
    });

    await newOutpass.save();
    res.status(201).json({ message: 'Outpass request submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting outpass request', details: err });
  }
});

router.get('/outpass', async (req, res) => {
    try {
      const outpassData = await Outpass.find();
      res.json(outpassData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving outpass data' });
    }
  });
  
  // Endpoint to get leave data
  router.get('/leave', async (req, res) => {
    try {
      const leaveData = await Leave.find();
      res.json(leaveData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving leave data' });
    }
  });
module.exports = router;
