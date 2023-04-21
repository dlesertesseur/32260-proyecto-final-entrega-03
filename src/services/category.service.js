import CategoryDao from "../persistence/nomgoDb/category.dao.js";
import categorySchema from "../models/category.model.js";

const dao = new CategoryDao("categories", categorySchema);

const getAllCategories = async () => {
  let ret = await dao.getAll();
  return ret;
};

const findCategoryById = async (id) => {
  console.log("findCategoryById -> ", id);
  let ret = await dao.findById(id);
  return ret;
};

const insertCategory = async (category) => {
  console.log("insertCategory -> ");
  let ret = await dao.insert(category);
  return ret;
};

const updateCategory = async (pid, body) => {
  console.log("updateCategory -> ");
  let ret = await dao.update(pid, body);
  return ret;
};

const deleteCategory = async (pid) => {
  let ret = await dao.delete(pid);
  return ret;
};
export { getAllCategories, findCategoryById, insertCategory, updateCategory, deleteCategory };
