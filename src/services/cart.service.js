import CartRepository from "../repositories/cart.repository.js";

const repository = new CartRepository();

const getAllCards = async () => {
  const ret = await repository.getAll();
  return ret;
};

const findCardById = async (id) => {
  const ret = await repository.findById(id);
  return ret;
};

const insertCart = async (cart) => {
  const ret = await repository.insert(cart);
  return ret;
};

const updateCart = async (id, body) => {
  const ret = await repository.update(id, body);
  return ret;
};

const removeCart = async (cid) => {
  const ret = await repository.remove(cid);
  return ret;
};

const addProductToCard = async (cid, pid, quantity) => {
  const ret = await repository.addProduct(cid, pid, quantity);
  return ret;
};

const removeProductCart = async (cid, pid) => {
  const ret = await repository.removeProduct(cid, pid);
  return ret;
};

const updateProductCart = async (cid, pid, body) => {
  const ret = await repository.updateProduct(cid, pid, body);
  return ret;
};

export {
  getAllCards,
  findCardById,
  insertCart,
  updateCart,
  removeCart,
  addProductToCard,
  updateProductCart,
  removeProductCart,
};
