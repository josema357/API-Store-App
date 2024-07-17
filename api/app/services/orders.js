const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class OrderService {
  async create(data) {
    console.log(data)
    const customer = await models.Customer.findByPk(data.customerId);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async add_item(data){
    const newitem = await models.OrderProduct.create(data);
    return newitem;
  }

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        }
      ]
    })
    return orders;
  }

  async find_all() {
    const data = await models.Order.findAll({
      include: ['customer', 'items'],
    });
    return data;
  }

  async find_by_id(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update_customer(id, changes) {
    const customer = await this.find_by_id(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.find_by_id(id);
    await customer.destroy();
    return {
      customer,
      message: 'Customer Deleted',
    };
  }
}

module.exports = OrderService;
