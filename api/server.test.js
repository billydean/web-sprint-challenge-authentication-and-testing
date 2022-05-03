const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');
const User = require('../api/auth/user-model')

const goodUser = {username: "keegan", password: "arugula" };
const noName = { password: "arugula" };
const noPass = { username: "keegan" };

beforeAll(async ()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async ()=>{
  await db('users').truncate();
});

afterAll(async ()=>{
  await db.destroy();
});

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

//can't figure out why my codegrade isn't passing, so I decided to make my own version of the test(s)!

describe('Register function issues', ()=> {
  describe('adding a new user', ()=>{
    it('should give correct response', async ()=>{
     await request(server)
        .post('/api/auth/register')
        .send(goodUser)
        .then((response) => {
          expect(response.status).toBe(201)
          expect(response.body.id).toBeTruthy()
          expect(response.body.username).toBe(goodUser.username)
          expect(response.body.password).toBeTruthy()
        })
    })})
    describe('adding a new user', ()=>{
      it('should complain if keegan forgets his name', async ()=>{
        await request(server)
          .post('/api/auth/register')
          .send(noName)
          .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('username and password required');
          })
      })
      it('should complain if keegan forgets his password', async ()=>{
        await request(server)
        .post('/api/auth/register')
        .send(noPass)
        .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body.message).toBe('username and password required');
        })
      })
    })
  })