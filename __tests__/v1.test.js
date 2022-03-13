"use strict";

const server = require("../src/server");
const supertest = require('supertest');
const request = supertest(server.app);
const {db} = require('../src/auth/models/index')

describe("server test", () => {

    beforeAll(async ()=>{
        await db.sync()
    })

    afterAll(async ()=>{
        await db.drop()
    })

    it('test 404 on a bad route', async () => {
        const response = await request.get('/ai/v1/foods');
        expect(response.status).toEqual(404);
    })

    it('test 404 on a bad method', async () => {
        const response = await request.delete('/api/v1/foods');
        expect(response.status).toEqual(404);
    })

    it('testing GET all', async () => {
        const response = await request.get('/api/v1/foods');
        expect(response.status).toEqual(200);
    })

    it('testing Post ', async () => {
        const response = await request.post('/api/v1/foods').send({
            foodName: "test",
            cusine: "test"
         });
       
         expect(typeof response.body).toEqual("object");
    })

    it('testing updated one', async () => {
        const response = await request.put('/api/v1/foods/1');
        expect(response.status).toEqual(200);
    })

    it('testing Deleted one', async () => {
        const response = await request.delete('/api/v1/foods/1');
        expect(response.text).toEqual("removedfoods");
    })
}

);