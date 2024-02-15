const express = require('express');
const OrderService = require('../services/orders');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {createOrderDTO, getOrderDTO, addItemDTO} = require('../dto/orders.dto');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find_all();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getOrderDTO, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.find_by_id(parseInt(id));
    res.json(order);
  } catch (error) {
    next(error);
  }
  
});

router.post('/', validatorHandler(createOrderDTO, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const order = await service.create(body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.post('/add-item', validatorHandler(addItemDTO, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const item = await service.add_item(body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;