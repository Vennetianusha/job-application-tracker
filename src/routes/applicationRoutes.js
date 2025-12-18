const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const appController = require('../controllers/applicationController');

// Applicant creates application
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['applicant']),
  appController.createApplication
);

// Recruiter/Admin updates status
router.put(
  '/status',
  authMiddleware,
  roleMiddleware(['recruiter', 'admin']),
  appController.updateStatus
);

module.exports = router;
