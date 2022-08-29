const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authorization');
const { getProfile } = require('../middlewares/getProfile');
const contractsController = require('../controllers/contracts.controller');

router.get('/', authenticateToken, contractsController.getAllContracts)

/**
 * FIX ME!
 * @returns contract by id
 */
 router.get('/:id', authenticateToken, getProfile, contractsController.GetContractById)

module.exports = router;