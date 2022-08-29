const { createError } = require('../helpers/errorHelper');
const { sequelize } = require('../models/model');

async function depositAmount(req) {
    const { Contract, Job, Profile } = req.app.get('models')
    await sequelize.transaction(async (t) => {
        if (req.profile.type !== 'client') {
            throw createError('Incorrect user profile', 400);

        }

        if (req.profile.id !== parseInt(req.params.userId)) {
            throw createError('Operation not permitted', 400);
        }

        const jobs = await Job.findAll({
            include: {
                model: Contract,
                required: true,
                where: {
                    ClientId: req.profile.id,
                    status: 'in_progress'
                }
            }
        });

        let maxAmount = 0;
        for (let job of jobs) {
            maxAmount += job.price;
        }

        if (maxAmount === 0) {
            throw createError('No amount to be paid. Someone is working for free apparently', 400);
        }

        if (req.body.amount > Math.round(maxAmount * 0.25)) {
            throw createError('Amount limit error', 400);
        }

        await Profile.update(
            { balance: req.profile.balance + req.body.amount },
            { where: { id: req.profile.id } },
        )
    })
}

module.exports = {
    depositAmount
}