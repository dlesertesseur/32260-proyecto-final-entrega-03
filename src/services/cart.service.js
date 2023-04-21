import CartDao from "../persistence/nomgoDb/cart.dao.js";
import cartSchema from "../models/cart.model.js";

const cartDAO = new CartDao("carts", cartSchema);

const getAllCards = async () => {
  const ret = await cartDAO.getAll();
  return ret;
};

const findCardById = async (id) => {
  const ret = await cartDAO.findById(id);
  return ret;
};

const insertCart = async (cart) => {
  const ret = await cartDAO.insert(cart);
  return ret;
};

const updateCart = async (id, body) => {
  const ret = await cartDAO.update(id, body);
  return ret;
};

const removeCart = async (cid) => {
  const ret = await cartDAO.remove(cid);
  return ret;
};

const addProductToCard = async (cid, pid, quantity) => {
  const ret = await cartDAO.addProduct(cid, pid, quantity);
  return ret;
};

const removeProductCart = async (cid, pid) => {
  const ret = await cartDAO.removeProduct(cid, pid);
  return ret;
};

const updateProductCart = async (cid, pid, body) => {
  const ret = await cartDAO.updateProduct(cid, pid, body);
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
