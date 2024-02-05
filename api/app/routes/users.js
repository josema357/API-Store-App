const express = require('express');
const UserService = require('../services/users');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {
  createUserDTO,
  updateUserDTO,
  getUserDTO,
} = require('../dto/user.dto');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find_all();
    res.json(users)
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getUserDTO, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.find_by_id(parseInt(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
  
});

router.post('/', validatorHandler(createUserDTO, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const user = await service.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getUserDTO, 'params'),
  validatorHandler(updateUserDTO, 'body'),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const user = await service.update_user(id, body);
      res.json(user);
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
    next(error)
  }
});

module.exports = router;
