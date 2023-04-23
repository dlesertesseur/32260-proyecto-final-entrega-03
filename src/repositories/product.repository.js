
import config from "../config/config.js";
import Product from "../entities/product.entity.js";
import ProductDaoFactory from "../factories/product.dao.factory.js";

class ProductRepository {
  constructor() {
    this.dao = ProductDaoFactory.create(config.PERSISTENCE);
  }

  async getAll(limit, page, sort, query) {
    const products = await this.dao.getAll(limit, page, sort, query);
    const list = products.payload?.map(product => new Product(product));
    products.payload = list;
    return(products);
  }

  async findById(id) {
    const product = await this.dao.findById(id);
    const entity = new Product(product);
    return(entity);
  }

  async create(payload) {
    const product = await this.dao.create(payload);
    const entity = new Product(product);
    return(entity);
  }

  async update(id, body) {
    const product = await this.dao.update(id, body);
    const entity = new Product(product);
    return(entity);
  }

  async delete(id) {
    const product = await this.dao.delete(id);
    const entity = new Product(product);
    return(entity);
  }
}

export default ProductRepository;
