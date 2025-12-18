const db = require('../config/db');
const workflowService = require('../services/workflowService');
const emailQueue = require('../queues/emailQueue');

// CREATE APPLICATION (Applicant)
exports.createApplication = (req, res) => {
  const { position, resume } = req.body;
  const userId = req.user.id;

  const sql = `
    INSERT INTO job_applications (user_id, position, resume)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, position, resume], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Application submitted' });
  });
};

// UPDATE APPLICATION STATUS (Recruiter/Admin)
exports.updateStatus = (req, res) => {
  const { applicationId, newStatus } = req.body;
  const userId = req.user.id;

  const getAppSql = `SELECT current_status FROM job_applications WHERE id = ?`;

  db.query(getAppSql, [applicationId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const currentStatus = results[0].current_status;

    // Check workflow rule
    if (!workflowService.isValidTransition(currentStatus, newStatus)) {
      return res.status(400).json({
        message: `Invalid transition from ${currentStatus} to ${newStatus}`
      });
    }

    const updateSql = `
      UPDATE job_applications
      SET current_status = ?
      WHERE id = ?
    `;

    db.query(updateSql, [newStatus, applicationId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Save history
      const historySql = `
        INSERT INTO application_status_history
        (application_id, old_status, new_status, changed_by)
        VALUES (?, ?, ?, ?)
      `;

      db.query(historySql, [applicationId, currentStatus, newStatus, userId]);

      // 🔔 STEP 5.2 — ADD JOB TO QUEUE
      emailQueue.add('sendStatusEmail', {
        applicationId,
        newStatus
      });

      res.json({ message: 'Application status updated' });
    });
  });
};
