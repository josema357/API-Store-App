const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.commerce.isbn(10),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }

  async create(data) {
    const newProduct = {
        id: faker.commerce.isbn(10),
        ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll() {
    return this.products;
  }

  async findOne(id) {
    return this.products.find(item => item.id === id);
  }

  async update(id, changes){
    const index = this.products.findIndex(item=>item.id === id);
    if(index===-1){
        throw new Error('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {...product, ...changes};
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item=>item.id === id);
    if(index===-1){
        throw new Error('Product not found')
    }
    this.products.splice(index, 1);
    return {message: 'deleted'}
  }

}

module.exports = ProductsService;
