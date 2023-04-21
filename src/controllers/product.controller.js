import {
  getAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { findByEmail } from "../services/user.service.js";

const getAll = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const sort = req.query.sort;
  const query = req.query.query;

  try {
    const data = await getAllProducts(limit, page, sort, query);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductsList = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const sort = req.query.sort;
  const query = req.query.query;

  try {
    const data = await getAllProducts(limit, page, sort, query);

    const user = await findByEmail(req.user.email);
    
    const userData = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cid: user?.cart?._id
    };

    const params = {data: data, user: userData};
    
    res.render("products", {
      title: "Products",
      style: "index.css",
      params,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await findProductById(pid);
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const insert = async (req, res) => {
  let product = null;
  try {
    product = await insertProduct(req.body);
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const pid = req.params.pid;

  if (pid) {
    try {
      const product = await updateProduct(pid, req.body);
      res.send(product);
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
      const product = await deleteProduct(pid);
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};
export { getAll, findById, update, insert, remove, getProductsList };
