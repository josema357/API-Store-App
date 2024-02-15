const router = require('../api/app/routes/users');
const request = require('supertest');
const express = require("express");

const app = express();
app.use(express.json());
app.use('/api/v1/users', router);

let userId;

/**
 * @description Test to GET /api/v1/users 
 */
describe("GET/users",()=>{
    test("should respond with a 200 status code and fetch all users", async()=>{
        const response = await request(app).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
/**
 * @description Test to POST /api/v1/users
 */
describe("POST/users",()=>{
    test("should respond with a 201 status code and create a new user", async()=>{
        const userData = {
            email: "testnew@gmail.com",
            password: "wsedtgyh89",
            role: "admintest"
        };
        const response = await request(app).post('/api/v1/users').send(userData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
    });
});
/**
 * @description Test to PATCH /api/v1/users/:id
 */
describe("PATCH/users", ()=>{
    test("should respond with a 200 status code and update a user by id", async ()=>{
        const updateUserData={
            email: "testUpdate@mail.com",
            password: "123456789",
            role: "customertest"
        };
        const response = await request(app).patch(`/api/v1/users/${userId}`).send(updateUserData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id',userId);
    });
});
/**
 * @description Test to DELETE /api/v1/users/:id
 */
describe("DELETE/users",()=>{
    test("should respond with a 200 status code and delete a user by id", async()=>{
        const response = await request(app).delete(`/api/v1/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("message", "User Deleted");
    });
});