const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.commerce.isbn(10),
        name: faker.commerce.department(),
      });
    }
  }

  create(data) {
    const newCategory={
        id: faker.commerce.isbn(10),
        ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item=>item.id===id);
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
