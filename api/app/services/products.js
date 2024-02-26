const  boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const { Op } = require('sequelize')

class ProductsService {

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find_all(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const {offset, limit} = query;
    if(limit && offset){
      options.limit = Number(limit);
      options.offset = Number(offset);
    }
    const {price} = query;
    if(price){
      options.where.price = price;
    }
    const {price_min, price_max} = query;
    if(price_min&&price_max){
      options.where.price = {
        [Op.gte]: Number(price_min),
        [Op.lte]: Number(price_max)
      };
    }
    const data = await models.Product.findAll(options);
    return data;
  }

  async find_by_id(id) {
    const product = await models.Product.findByPk(id)
    if(!product){
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async update_product(id, changes){
    const product = await this.find_by_id(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.find_by_id(id);
    await product.destroy();
    return {
      product,
      message: "Product Deleted"
    }
  }

}

module.exports = ProductsService;
