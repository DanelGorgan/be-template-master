const { Op } = require("sequelize");

async function getAllContracts(req) {
    const { Contract } = req.app.get('models')
    const { id } = req.user;
    return Contract.findAll({
        where: {
            [Op.or]: [
                { ClientId: id },
                { ContractorId: id }
            ]
        }
    });
}
async function getContract(req) {
    const { Contract } = req.app.get('models')
    const { id } = req.params
    return Contract.findOne({ where: { id } })
}

module.exports = {
    getAllContracts,
    getContract
}