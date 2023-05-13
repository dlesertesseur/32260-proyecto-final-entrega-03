import ProductRepository from "../repositories/product.repository.js";

const repository = new ProductRepository();

const getAllProducts = async (limit = 10, page = 1, sort, query = null) => {
  let ret = await repository.getAll(limit, page, sort, query);
  return ret;
};

const findProductById = async (id) => {
  let ret = await repository.findById(id);
  return ret;
};

const insertProduct = async (product) => {
  let ret = await repository.create(product);
  return ret;
};

const updateProduct = async (pid, body) => {
  let ret = await repository.update(pid, body);
  return ret;
};

const deleteProduct = async (pid) => {
  let ret = await repository.delete(pid);
  return ret;
};
export {
  getAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
