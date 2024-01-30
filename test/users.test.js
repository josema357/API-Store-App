const router = require('../api/app/Users/Routes/users');
const request = require('supertest');
const express = require("express");

const app = express();
app.use(express.json());
app.use('/api/v1/users', router);

/**
 * @description collection of test to users endpoints
 * @param {string} - endpoint name 
 */
describe("GET/users",()=>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get('/api/v1/users').send();
        expect(response.statusCode).toBe(200);
    });
    test("should respond with an array", async()=>{
        const response= await request(app).get('/api/v1/users').send();
        expect(response.body).toBeInstanceOf(Array);
    })
    test("should have a content-type:application/json in Header", async()=>{
        const response=await request(app).get('/api/v1/users').send();
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        )
    });
})