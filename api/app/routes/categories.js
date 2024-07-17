const express = require('express');
const CategoriesService = require('../services/categories');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {
  createCategoryDTO,
  updateCategoryDTO,
  getCategoryDTO,
} = require('../dto/categories.dto');
const passport = require("passport");
const { checkRoles } = require('../../Middlewares/authHandler')

const router = express.Router();
const service = new CategoriesService();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'), 
  async (req, res, next) => {
  try {
    const categories = await service.find_all();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'), 
  validatorHandler(getCategoryDTO, 'params'), 
  async(req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.find_by_id(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  passport.authenticate('jwt', {session: false}), 
  checkRoles('admin'),
  validatorHandler(createCategoryDTO, 'body'), 
  async (req, res, next) => {
  try {
    const { body } = req;
    const category = await service.create(body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getCategoryDTO, 'params'),
  validatorHandler(updateCategoryDTO, 'body'),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const category = await service.update_category(id, body);
      res.json(category);
    } catch (error) {
        next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
