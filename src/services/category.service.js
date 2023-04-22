import CategoryRepository from "../repositories/category.repository.js";

const repository = new CategoryRepository();

const getAllCategories = async () => {
  let ret = await repository.getAll();
  return ret;
};

const findCategoryById = async (id) => {
  console.log("findCategoryById -> ", id);
  let ret = await repository.findById(id);
  return ret;
};

const insertCategory = async (category) => {
  console.log("insertCategory -> ");
  let ret = await repository.insert(category);
  return ret;
};

const updateCategory = async (pid, body) => {
  console.log("updateCategory -> ");
  let ret = await repository.update(pid, body);
  return ret;
};

const deleteCategory = async (pid) => {
  let ret = await repository.delete(pid);
  return ret;
};
export { getAllCategories, findCategoryById, insertCategory, updateCategory, deleteCategory };
