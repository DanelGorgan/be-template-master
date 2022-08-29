const adminContract = require('../services/admin.service');

async function getBestProfession(req, res, next) {
    try {
        const profession = await adminContract.getBestProfession(req);
        return res.json({ profession })
    } catch (error) {
        next(error);
    }
}

async function getBestClients(req, res, next) {
    try {
        const jobs = await adminContract.getBestClients(req);
        return res.json(jobs.map(job => ({
            id: job.Contract.Client.id,
            paid: job.paid,
            name: `${job.Contract.Client.firstName} ${job.Contract.Client.lastName}`
        })));
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getBestClients,
    getBestProfession
}