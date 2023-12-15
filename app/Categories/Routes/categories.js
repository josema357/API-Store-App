const express = require('express');
const CategoriesService = require('../Services/categories');

const router = express.Router();
const service = new CategoriesService();

router.get('/',(req, res)=>{
    const categories = service.findAll();
    res.json(categories);
})

router.get('/:id',(req, res)=>{
    const {id} = req.params;
    const product = service.findOne(id);
    res.json(product);
})

router.post('/', (req, res)=>{
    const { body } = req;
    const category = service.create(body);
    res.json(category);
})

router.patch('/:id', (req, res)=>{
    const { body , params: {id}} = req;
    const category = service.update(id, body);
    res.json(category);
})

router.delete('/:id', (req, res)=>{
    const { params: {id}} = req;
    const response = service.delete(id);
    res.json(response);
})

module.exports=router;