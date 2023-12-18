const express = require('express');
const ProductService = require('../Services/products');
const { validatorHandler } = require('./../../../Middlewares/validatorHandler');
const {
  createProductDTO,
  updateProductDTO,
  getProductDTO,
} = require('./../DTO/productsDTO');

const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
  const products = service.findAll();
  res.json(products);
});

router.get('/:id', validatorHandler(getProductDTO, 'params'), (req, res) => {
  const { id } = req.params;
  const products = service.findOne(id);
  res.json(products);
});

router.post('/', validatorHandler(createProductDTO, 'body'), (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch(
  '/:id',
  validatorHandler(getProductDTO, 'params'),
  validatorHandler(updateProductDTO, 'body'),
  (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const product = service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = service.delete(id);
  res.status(200).json(response);
});

module.exports = router;
