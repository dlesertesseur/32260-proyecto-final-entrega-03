import { insertCart } from "../services/cart.service.js";
import {
  getAllUsers,
  findUserById,
  insertUser,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  const pid = req.params.pid;
  try {
    const user = await findUserById(pid);
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const insert = async (req, res) => {
  try {
    const ret = await insertUser(req.body);
    res.send(ret);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const pid = req.params.pid;

  if (pid) {
    try {
      const user = await updateUser(pid, req.body);
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const remove = async (req, res) => {
  const pid = req.params.pid;

  if (pid) {
    try {
      const user = await deleteUser(pid);
      res.send(user);
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const addCart = async (req, res) => {
  const uid = req.params.uid;

  if (uid) {
    try {
      const user = await findUserById(uid);
      const cart = await insertCart();
      user.cart = cart;
      await updateUser(user._id, user); 
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};
export { getAll, findById, update, insert, remove, addCart };
