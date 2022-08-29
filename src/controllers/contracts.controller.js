const contractsService = require('../services/contracts.service');

async function getAllContracts(req, res, next) {
    try {
        const contracts = await contractsService.getAllContracts(req);
        return res.json(contracts.filter(contract => contract.status !== 'terminated'))
    } catch (error) {
        next(error);
    }
}

async function GetContractById(req, res, next) {
    try {
        const contract = await contractsService.getContract(req);
        if (!contract) {
            throw createError('Not found', 404);
        }
        return res.json(contract)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllContracts,
    GetContractById
}