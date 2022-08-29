const { createError } = require('../helpers/errorHelper');
const balancesContract = require('../services/balances.service');

async function depositAmount (req, res, next) {
    try {
        if (!req.body.amount){
            throw createError('amount field is required', 400);
        }
        await balancesContract.depositAmount(req);
        return res.json({messagee: 'success'})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    depositAmount
}