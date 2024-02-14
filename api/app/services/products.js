const  boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class ProductsService {

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find_all() {
    const data = await models.Product.findAll({
      include: ['category']
    });
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
