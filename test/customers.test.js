const router = require('../api/app/routes/customers');
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/v1/customers', router);

let customerId;

/**
 * @description Test to GET /api/v1/customers
 */
describe("GET/customers", ()=>{
    test("should respond with a 200 status code and fetch all customers",async()=>{
        const response = await request(app).get("/api/v1/customers");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})
/**
 * @description Test to POST /api/v1/customers
 */
describe("POST/customers", ()=>{
    test("should respond with a 201 status code and create a new customer", async()=>{
        const customerData = {
            name : "customertest",
            lastName : "testcustomer",
            phone: "987452369",
            user: {
                email: "test3@gmail.com",
                password: "derft589652"
            }
        }
        const response = await request(app).post("/api/v1/customers").send(customerData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        customerId = response.body.id;
    })
})
/**
 * @description Test to PATCH /api/v1/customers/:id
 */
describe("PATCH/customers", ()=>{
    test("should respond with a 200 status code and update a customer by id", async ()=>{
        const customerData = {
            name : "customertestupdate",
            lastName : "testcustomerupdate",
            phone: "987452369"
        }
        const response = await request(app).patch(`/api/v1/customers/${customerId}`).send(customerData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", customerId);
    })
})
/**
 * @description Test to DELETE /api/v1/customers/:id
 */
describe("DELETE/customers", ()=>{
    test("should respond with a 200 status code and delete a customer by id", async ()=>{
        const response = await request(app).delete(`/api/v1/customers/${customerId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("customer");
        expect(response.body).toHaveProperty("message", "Customer Deleted");

    })
})