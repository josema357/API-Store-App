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

router.get('/:id', validatorHandler(getUserDTO, 'params'), (req, res) => {
  const { id } = req.params;
  const user = service.find_by_id(parseInt(id));
  res.json(user);
});

router.post('/', validatorHandler(createUserDTO, 'body'), (req, res) => {
  const { body } = req;
  const user = service.create(body);
  res.status(201).json(user);
});

router.patch(
  '/:id',
  validatorHandler(getUserDTO, 'params'),
  validatorHandler(updateUserDTO, 'body'),
  (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const user = service.update(id, body);
      res.json(user);
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
