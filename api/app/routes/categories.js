const express = require('express');
const CategoriesService = require('../services/categories');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {
  createCategoryDTO,
  updateCategoryDTO,
  getCategoryDTO,
} = require('../dto/categories.dto');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find_all();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getCategoryDTO, 'params'), (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', validatorHandler(createCategoryDTO, 'body'), (req, res) => {
  const { body } = req;
  const category = service.create(body);
  res.json(category);
});

router.patch(
  '/:id',
  validatorHandler(getCategoryDTO, 'params'),
  validatorHandler(updateCategoryDTO, 'body'),
  (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const category = service.update(id, body);
      res.json(category);
    } catch (error) {
        next(error);
    }
  },
);

router.delete('/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const response = service.delete(id);
  res.status(200).json(response);
});

module.exports = router;
