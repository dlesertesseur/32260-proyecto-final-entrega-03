import userSchema from "../models/user.model.js";
import UserDao from "../persistence/nomgoDb/user.dao.js";

const dao = new UserDao("user", userSchema);

const getAllUsers = async (email) => {
  const users = await dao.getAll(email);
  return users;
};

const findByEmail = async (email) => {
  const user = await dao.findByEmail(email);
  return user;
};

const findUserById = async (id) => {
  const user = await dao.findById(id);
  return user;
};

const updateUser = async (uid, user) => {
  await dao.update(uid, user);
};

const insertUser = async (uid, user) => {
  await dao.insert(uid, user);
};

const deleteUser = async (uid, user) => {
  await dao.delete(uid, user);
};

export { getAllUsers, findByEmail, findUserById, updateUser, insertUser, deleteUser };
