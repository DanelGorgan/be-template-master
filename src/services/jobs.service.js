const { Op } = require('sequelize');
const { createError } = require('../helpers/errorHelper');
const { sequelize } = require('../models/model')

async function getUnpaidJobs(req) {
    const { Job, Contract } = req.app.get('models')

    const jobs = await Job.findAll({
        include: {
            model: Contract,
            required: true,
            where: {
                status: 'in_progress',
                [Op.or]: [{ ContractorId: `${req.user.id}` }, { ClientId: `${req.user.id}` }]
            },
            attributes: []
        },
        where: {
            paid: null
        },
    })

    return jobs;
}


async function payJob(req) {
    const { Contract, Job, Profile } = req.app.get('models')

    await sequelize.transaction(async (t) => {
        const clientProfile = await Job.findOne({
            where: {
                id: req.params.job_id
            },
            include: {
                model: Contract,
                required: true,
                include: {
                    model: Profile,
                    as: 'Client',
                    required: true,
                }
            }
        });

        // verify if we pay with the correct amount
        if (clientProfile.price !== req.body.price) {
            throw createError('Job price is different from given price', 400);
        }

        if (clientProfile.Contract.Client.balance < req.body.price) {
            throw createError('Someone needs to recharge their account', 400);

        }

        if (clientProfile.Contract.status === 'terminated') {
            throw createError('Contract is terminated', 400);
        }

        const contractorProfile = await Contract.findOne({
            where: {
                id: clientProfile.ContractId
            },
            include: {
                model: Profile,
                as: "Contractor",
                required: true,
            }
        })

        await Promise.all[
            Profile.update(
                { balance: contractorProfile.Contractor.balance + req.body.price },
                { where: { id: contractorProfile.Contractor.id } },
            ), Profile.update(
                { balance: clientProfile.Contract.Client.balance - req.body.price },
                { where: { id: clientProfile.Contract.Client.id } },
            ), Job.update(
                { paymentDate: new Date().toISOString() },
                { where: { id: req.params.job_id } },
            )
        ]
    })
}

module.exports = {
    getUnpaidJobs,
    payJob
}