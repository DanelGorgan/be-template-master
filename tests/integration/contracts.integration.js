const request = require("supertest");
const assert = require("assert");
const app = require("../../src/app");
const { generateAccessToken } = require("../utils/util");

describe("Test /contracts", () => {
  it("should return all the user's contracts when user is contractor", async () => {
    const id = 5;
    const response = await request(app)
      .get("/contracts")
      .set('Authorization', `Bearer ${generateAccessToken({ id })}`)
      .expect(200);
      
    for (let c of response.body){
      assert.equal(c.ContractorId, id)
    }
  });

  it("should return all the user's contracts of an client", async () => {
    const id = 5;
    const response = await request(app)
      .get("/contracts")
      .set('Authorization', `Bearer ${generateAccessToken({ id })}`)
      .expect(200);
      
    for (let c of response.body){
      assert.equal(c.ClientId , id)
    }
  });
});