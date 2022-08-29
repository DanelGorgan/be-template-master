const { authenticateToken, checkAdminRights } = require('../middlewares/authorization');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')


router.get('/best-profession', authenticateToken, checkAdminRights, adminController.getBestProfession);

router.get('/best-clients', authenticateToken, checkAdminRights, adminController.getBestClients);

module.exports = router;