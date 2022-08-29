const jobsService = require('../services/jobs.service');

async function getUnpaidJobs(req, res) {
    try {
        const jobs = await jobsService.getUnpaidJobs(req);
        return res.json(jobs)
    } catch (error) {
        next(error);
    }
}

async function payJob (req, res, next) {
    try {
        await jobsService.payJob(req);
        return res.json({message: 'success'});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUnpaidJobs,
    payJob
}