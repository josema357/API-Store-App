const router = require('../api/app/routes/categories');
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/v1/categories', router);

let categoryId;

/**
 * @description Test to GET /api/v1/categories
 */
describe("GET/categories", ()=>{
    test("should respond with a 200 status code and fetch all categories", async ()=>{
        const response = await request(app).get("/api/v1/categories");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
/**
 * @description Test to POST /api/v1/categories
 */
describe("POST/categories", ()=>{
    test("should respond with a 201 status code and create a new category", async ()=>{
        const categoryData = {
            name:"new category"
        }
        const response = await request(app).post("/api/v1/categories").send(categoryData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        categoryId = response.body.id;
    });
});
/**
 * @description Test to PATCH /api/v1/categories/:id
 */
describe("PATCH/categories",()=>{
    test("should respond with a 200 status code and update a category by id", async ()=>{
        const categoryUpdateData = {
            name:"new category update"
        };
        const response = await request(app).patch(`/api/v1/categories/${categoryId}`).send(categoryUpdateData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", categoryId);
    });
});
/**
 * @description Test to DELETE /api/v1/categories/:id
 */
describe("DELETE/categories", ()=>{
    test("should respond with a 200 status code and delete a category by id", async ()=>{
        const response = await request(app).delete(`/api/v1/categories/${categoryId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("message", "Category Deleted");
    })
});