const express = require('express');
const ProductService = require('../services/products');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {
  createProductDTO,
  updateProductDTO,
  getProductDTO,
  queryProductDTO
} = require('../dto/products.dto');

const router = express.Router();
const service = new ProductService();

router.get('/', validatorHandler(queryProductDTO, 'query'), async (req, res, next) => {
  try {
    const products = await service.find_all(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getProductDTO, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.find_by_id(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductDTO, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getProductDTO, 'params'),
  validatorHandler(updateProductDTO, 'body'),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const product = await service.update_product(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
