const express = require('express');
const CustomerService = require('../services/customers');
const { validatorHandler } = require('../../Middlewares/validatorHandler');
const {
  createCustomerDTO, 
  updateCustomerDTO, 
  getCustomerDTO
} = require('../dto/customer.dto');


const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find_all();
    res.json(customers)
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getCustomerDTO, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.find_by_id(parseInt(id));
    res.json(customer);
  } catch (error) {
    next(error);
  }
  
});

router.post('/', validatorHandler(createCustomerDTO, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const customer = await service.create(body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getCustomerDTO, 'params'),
  validatorHandler(updateCustomerDTO, 'body'),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const customer = await service.update_customer(id, body);
      res.json(customer);
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
