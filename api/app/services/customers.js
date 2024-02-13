const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CustomerService {

  async create(data){
    const allData = {
      ...data, user: {...data.user,"role":"customer" }
    }
    const newCustomer= await models.Customer.create(allData, {include: ['user']});
    return newCustomer;
  }

  async find_all(){
    const data = await models.Customer.findAll({
      include: ['user']
    });
    return data;
  }

  async find_by_id(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async update_customer(id, changes){
    const customer = await this.find_by_id(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id){
    const customer = await this.find_by_id(id);
    await customer.destroy();
    return {
      customer,
      message: "User Deleted"
    }
  }
}

module.exports = CustomerService;
