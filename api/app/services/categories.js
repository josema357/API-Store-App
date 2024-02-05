const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

const {models} = require('../../libs/sequelize');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      });
    }
  }

  create(data) {
    const newCategory={
        id: faker.string.uuid(),
        ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  async find_all() {
    const data = await models.Category.findAll();
    return data;
  }

  findOne(id) {
    const category = this.categories.find(item=>item.id===id);
    if(!category){
      throw boom.notFound("Product not found");
    }
    return category;
  }

  update(id, changes) {
    const index = this.categories.findIndex(item=>item.id===id);
    if(index===-1){
        throw new Error("Category not found")
    }
    const category = this.categories[index];
    this.categories[index] = {...category, ...changes}
    return this.categories[index];
  }
  
  delete(id) {
    const index = this.categories.findIndex(item=>item.id===id);
    if(index===-1){
        throw new Error("Category not found")
    }
    this.categories.splice(index, 1);
    return {message: "Deleted"}
  }
}

module.exports = CategoriesService;
