const { Op } = require('sequelize');
const { createError } = require('../helpers/errorHelper');
const { sequelize } = require('../models/model')    

async function getBestProfession (req) {
    const { Job, Contract, Profile } = req.app.get('models')
    const startDate = req.query.start;
    const endDate = req.query.end;

    const bestProfession = await Job.findOne({
        attributes: [
            'id',
            'contractId',
            'description',
            [sequelize.fn('sum', sequelize.col('price')), 'total_amount'],
        ],
        include: {
            model: Contract,
            required: true,
            include: {
                model: Profile,
                required: true,
                as: "Contractor"
            }
        },
        where: {
            paid: 1,
            paymentDate: { [Op.between]: [startDate, endDate] }
        },
        group: 'contractid',
        order: sequelize.literal('price DESC'),
    })

    return bestProfession.Contract.Contractor.profession;
}

async function getBestClients (req) {
    const { Job, Contract, Profile } = req.app.get('models')
    const startDate = req.query.start;
    const endDate = req.query.end;

    const jobs = await Job.findAll({
        attributes: [
            'id',
            [sequelize.fn('sum', sequelize.col('price')), 'paid'],
        ],
        include: {
            model: Contract,
            required: true,
            include: {
                model: Profile,
                required: true,
                as: "Client",
                attributes: ['id', 'firstName','lastName']
            }
        },
        where: {
            paid: 1,
            paymentDate: { [Op.between]: [startDate, endDate] }
        },
        group: 'contractid',
        order: sequelize.literal('paid DESC'),
        limit: req.query.limit || 2
    })

    return jobs;
}

module.exports = {
    getBestProfession,
    getBestClients
}