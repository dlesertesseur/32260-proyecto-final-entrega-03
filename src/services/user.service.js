import UserRepository from "../repositories/user.repository.js";

const repository = new UserRepository();

const getAllUsers = async (email) => {
  const users = await repository.getAll(email);
  return users;
};

const findByEmail = async (email) => {
  const user = await repository.findByEmail(email);
  return user;
};

const findUserById = async (id) => {
  const user = await repository.findById(id);
  return user;
};

const updateUser = async (uid, user) => {
  await repository.update(uid, user);
};

const insertUser = async (uid, user) => {
  await repository.insert(uid, user);
};

const deleteUser = async (uid, user) => {
  await repository.delete(uid, user);
};

const addCartToUser = async (uid) => {
  const user = await repository.addCartToUser(uid);
  return(user)
}

export { getAllUsers, findByEmail, findUserById, updateUser, insertUser, deleteUser, addCartToUser };
