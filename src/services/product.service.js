import ProductRepository from "../repositories/product.repository.js";

const repository = new ProductRepository();

const getAllProducts = async (limit, page, sort, query) => {
  let ret = await repository.getAll(limit, page, sort, query);
  return ret;
};

const findProductById = async (id) => {
  console.log("findProductById -> ", id);
  let ret = await repository.findById(id);
  return ret;
};

const insertProduct = async (product) => {
  console.log("insertProduct -> ");
  let ret = await repository.insert(product);
  return ret;
};

const updateProduct = async (pid, body) => {
  console.log("updateProduct -> ");
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
