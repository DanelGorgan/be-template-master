const { authenticateToken, checkAdminRights } = require('../middlewares/authorization');
const { getProfile } = require('../middlewares/getProfile');
const { validateDepositBody } = require('../middlewares/validation');
const express = require('express');
const router = express.Router();
const balancesController = require('../controllers/balances.controller');

router.post('/deposit/:userId', authenticateToken, validateDepositBody, checkAdminRights, getProfile, balancesController.depositAmount);

module.exports = router;