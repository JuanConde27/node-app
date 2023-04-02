const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class productsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        Image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: faker.datatype.uuid(),
          ...data,
        };
        if (!newProduct.name) {
          throw boom.badRequest('Name is required');
        }
        this.products.push(newProduct);
        resolve(newProduct);
      }, 2000);
    });
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
        if (this.products.length === 0) {
          throw boom.notFound('No product found');
        }
      }, 2000);
    });
  }

  async findOne(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.products.find(item => item.id === id);
        if (!product) {
          throw boom.notFound('Product not found');
        }
        if (product.isBlock) {
          throw boom.conflict('Product is blocked');
        }
        resolve(product);
      }, 2000);
    });
  }

  async update(id, changes) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
          throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
          ...product,
          ...changes,
        };
        resolve(this.products[index]);
      }, 2000);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
          throw boom.notFound('Product not found');
        }
        this.products.splice(index, 1);
        resolve();
      }, 2000);
    });
  }
}

module.exports = productsService;
