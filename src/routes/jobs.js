const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authorization');
const { getProfile } = require('../middlewares/getProfile');
const { validatePaymentBody } = require('../middlewares/validation');
const jobsController = require('../controllers/jobs.controller');

router.get('/unpaid', authenticateToken, jobsController.getUnpaidJobs)


router.post('/:job_id/pay', authenticateToken, validatePaymentBody, getProfile, jobsController.payJob);

module.exports = router;