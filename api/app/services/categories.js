const boom = require('@hapi/boom')
const {models} = require('../../libs/sequelize');

class CategoriesService {

  async create(data) {
    const newCategory= await models.Category.create(data);
    return newCategory;
  }

  async find_all() {
    const data = await models.Category.findAll();
    return data;
  }

  async find_by_id(id) {
    const category = await models.Category.findByPk(id);
    if(!category){
      throw boom.notFound("Category not found");
    }
    return category;
  }

  async update_category(id, changes) {
    const category = await this.find_by_id(id);
    const response = await category.update(changes);
    return response;
  }
  
  async delete(id) {
    const category = await this.find_by_id(id);
    await category.destroy();
    return {
      category,
      message: "Category Deleted"
    };
  }
}

module.exports = CategoriesService;
