const express = require('express');
const UserService = require('../Services/users');
const { validatorHandler } = require('../../../Middlewares/validatorHandler');
const {
  createUserDTO,
  updateUserDTO,
  getUserDTO,
} = require('../DTO/userDTO');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  const users = service.findAll();
  res.json(users);
});

router.get('/:id', validatorHandler(getUserDTO, 'params'), (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
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
