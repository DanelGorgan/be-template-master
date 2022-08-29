const assert = require("assert");
const contractService = require('../../src/services/contracts.service')
const sinon = require('sinon');

describe("Test /contracts", () => {
    it("should return all the user's contracts when user is contractor", async () => {
        const expectedResponse = [{
            "id": 2,
            "terms": "bla bla bla",
            "status": "in_progress",
            "createdAt": "2022-08-25T12:28:28.852Z",
            "updatedAt": "2022-08-25T12:28:28.852Z",
            "ContractorId": 6,
            "ClientId": 1
        }];
        const req = {
            app: {
                get: () => ({
                    Contract: {
                        findAll: () => expectedResponse
                    }
                })
            },
            user: { id: 1 }
        }
        const contracts = await contractService.getAllContracts(req);
        assert.deepStrictEqual(contracts, expectedResponse);
    });

    it.only("should return all the user's contracts of an client", async () => {
        const expectedResponse = {
            "id": 2,
            "terms": "bla bla bla",
            "status": "in_progress",
            "createdAt": "2022-08-25T12:28:28.852Z",
            "updatedAt": "2022-08-25T12:28:28.852Z",
            "ContractorId": 6,
            "ClientId": 1
        };

        const findOneObj = {
            Contract: {
                findOne: () => expectedResponse
            }
        }
        const req = {
            app: {
                get: () => findOneObj
            },
            user: { id: 1 },
            params: { id: 1 }
        }
        const spy = sinon.spy(findOneObj.Contract, 'findOne');
        const contracts = await contractService.getContract(req);
        assert.deepStrictEqual(contracts, expectedResponse);
        assert(spy.calledOnceWith({ where: { id: 1 } }));

        // Reset the spy
        sinon.restore();
    });
});