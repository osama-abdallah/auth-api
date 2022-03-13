'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const server = require('../src/server');
const { db } = require('../src/auth/models/index');

const mockRequest = supertest(server.app);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin'},
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('testing v2',()=>{
    it('testing admin',async ()=>{
        let usersInfo=users['admin']
        console.log(usersInfo, '10100101');
        let res = await mockRequest.post('/signup').send(usersInfo)
        expect(res.status).toBe(201);
        const response = await mockRequest.post('/signin')
        .auth(usersInfo.username, usersInfo.password);

      const token = response.body.token;
      let bearerResponse = await mockRequest
        .get('/user')
        .set('Authorization', `Bearer ${token}`)
        
      expect(bearerResponse.status).toBe(200);
      bearerResponse = await mockRequest
      .post('/api/v2/foods')
      .set('Authorization', `Bearer ${token}`).send({'foodName':'pizza', 'cusine':'italian'})
      expect(bearerResponse.status).toEqual(201)

      bearerResponse = await mockRequest
      .get('/api/v2/foods')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(200)
      
      bearerResponse = await mockRequest
      .put('/api/v2/foods/1')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(200)

      bearerResponse = await mockRequest
      .delete('/api/v2/foods/1')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(200)
    })

    it('testing admin',async ()=>{
        let usersInfo=users['editor']
        console.log(usersInfo, '10100101');
        let res = await mockRequest.post('/signup').send(usersInfo)
        expect(res.status).toBe(201);
        const response = await mockRequest.post('/signin')
        .auth(usersInfo.username, usersInfo.password);

      const token = response.body.token;
      let bearerResponse = await mockRequest
        .get('/user')
        .set('Authorization', `Bearer ${token}`)
        
      expect(bearerResponse.status).toBe(200);
      bearerResponse = await mockRequest
      .post('/api/v2/foods')
      .set('Authorization', `Bearer ${token}`).send({'foodName':'pizza', 'cusine':'italian'})
      expect(bearerResponse.status).toEqual(201)

      bearerResponse = await mockRequest
      .get('/api/v2/foods')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(200)
      
      bearerResponse = await mockRequest
      .put('/api/v2/foods/1')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(200)

      bearerResponse = await mockRequest
      .delete('/api/v2/foods/1')
      .set('Authorization', `Bearer ${token}`)
      expect(bearerResponse.status).toEqual(500)
    })
})