import ProductDao from "../persistence/nomgoDb/product.dao.js";
import productSchema from "../models/product.model.js";

const dao = new ProductDao("products", productSchema);

const getAllProducts = async (limit, page, sort, query) => {
  let ret = await dao.getAll(limit, page, sort, query);
  return ret;
};

const findProductById = async (id) => {
  console.log("findProductById -> ", id);
  let ret = await dao.findById(id);
  return ret;
};

const insertProduct = async (product) => {
  console.log("insertProduct -> ");
  let ret = await dao.insert(product);
  return ret;
};

const updateProduct = async (pid, body) => {
  console.log("updateProduct -> ");
  let ret = await dao.update(pid, body);
  return ret;
};

const deleteProduct = async (pid) => {
  let ret = await dao.delete(pid);
  return ret;
};
export { getAllProducts, findProductById, insertProduct, updateProduct, deleteProduct };
