const { createError } = require("../helpers/errorHelper")

async function validatePaymentBody (req, res, next) {
    if (!req.body.price) {
        return next(createError('price is required', 400))
    }
    next();
}

async function validateDepositBody (req, res, next) {
    if (!req.body.amount) {
        return next(createError('amount is required', 400))
    }
    next();
}



module.exports = {
    validatePaymentBody,
    validateDepositBody
}