const router = require('../api/app/routes/products');
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/v1/products',router);

let productId;

/**
 * @description Test to GET /api/v1/products
 */
describe("GET/products", ()=>{
    test("should respond with a 200 status code and fetch all products", async ()=>{
        const response = await request(app).get("/api/v1/products");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
/**
 * @description Test to POST /api/v1/products
 */
describe("POST/products", ()=>{
    test("should respond with a 201 status code and create a new product", async ()=>{
        const productData = {
            name:"new product",
            description:"description description description description description description description description",
            price: 250,
            image:"https://3.bp.blogspot.com/-JxYjZjRXIh4/VDWJoJPtYuI/AAAAAAACVDM/C9r2wraqtlQ/s1600/paisajes%2Bnaturales%2Bfotos%2Bnuevas%2B(10).jpg",
            categoryId: 1
        }
        const response = await request(app).post("/api/v1/products").send(productData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        productId = response.body.id;
    });
});
/**
 * @description Test to PATCH /api/v1/products/:id
 */
describe("PATCH/products",()=>{
    test("should respond with a 200 status code and update a product by id", async ()=>{
        const productUpdateData = {
            name:"new product update",
            description:"update update update update update update update update update update",
            price: 400,
            image:"https://3.bp.blogspot.com/-JxYjZjRXIh4/VDWJoJPtYuI/AAAAAAACVDM/C9r2wraqtlQ/s1600/paisajes%2Bnaturales%2Bfotos%2Bnuevas%2B(10).jpg"
        };
        const response = await request(app).patch(`/api/v1/products/${productId}`).send(productUpdateData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", productId);
    });
});
/**
 * @description Test to DELETE /api/v1/products/:id
 */
describe("DELETE/products", ()=>{
    test("should respond with a 200 status code and delete a product by id", async ()=>{
        const response = await request(app).delete(`/api/v1/products/${productId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("product");
        expect(response.body).toHaveProperty("message", "Product Deleted");
    })
});