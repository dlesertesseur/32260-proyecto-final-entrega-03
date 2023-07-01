import {
  getAllUsers,
  findUserById,
  insertUser,
  updateUser,
  deleteUser,
  addCartToUser,
  changeUserRole,
  generateDocumentURL,
  updateUserDocuments,
  updateUserProfileImage,
} from "../services/user.service.js";
import path from "path";

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
      req.logger.error(error);
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
      const user = addCartToUser(uid);
      res.send(user);
    } catch (error) {
      req.logger.error(error);
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const changeRole = async (req, res) => {
  const uid = req.params.uid;

  if (uid) {
    try {
      await changeUserRole(uid);
      res.send({status:200});
    } catch (error) {
      // req.logger.error(error);
      // res.status(500).send({ message: error.message });
      res.send(error);
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const processDocuments = async (req, res, files) => {
  if (files && files.length > 0) {
    const { uid } = req.params;

    const documentStatus = files.map((file) => ({
      name: path.parse(file.originalname).name,
      reference: generateDocumentURL(file, uid),
    }));
    const resp = await updateUserDocuments(uid, documentStatus);
    res.send({
      status: "success",
      payload: `Documentos cargados correctamente`,
      duplicated: resp.duplicateDocuments,
    });
  } else {
    res.status(400).send({
      status: "error",
      payload: "No se proporcionaron documentos",
    });
  }
};

const processProfileImage = async (req, res, files) => {
  if (files && files.length > 0) {
    const { uid } = req.params;

    const documentStatus = files.map((file) => ({
      name: path.parse(file.originalname).name,
      reference: generateDocumentURL(file, uid),
    }));
    const resp = await updateUserProfileImage(uid, documentStatus);
    res.send({
      status: "success",
      payload: `Imagen de perfile cargada correctamente`,
      duplicated: resp.duplicateDocuments,
    });
  } else {
    res.status(400).send({
      status: "error",
      payload: "No se proporcionaron documentos",
    });
  }
}
const processProductPhotos = async (req, res, files) => {
  if (files && files.length > 0) {
    const { uid } = req.params;

    const documentStatus = files.map((file) => ({
      name: path.parse(file.originalname).name,
      reference: generateDocumentURL(file, uid),
    }));
    const resp = await updateUserProfileImage(uid, documentStatus);
    res.send({
      status: "success",
      payload: `Fotos de producto cargada correctamente`,
      duplicated: resp.duplicateDocuments,
    });
  } else {
    res.status(400).send({
      status: "error",
      payload: "No se proporcionaron documentos",
    });
  }
}

const uploadDocuments = async (req, res) => {
  try {
    const files = req.files;

    if (files.profile) {
      await processProfileImage(req, res, files.profile);
    }

    if (files.document) {
      await processDocuments(req, res, files.document);
    }

    if (files.product) {
      await processProductPhotos(req, res, files.product);
    }
  } catch (error) {
    res.send({
      status: "error",
      payload: error.message,
    });
  }
};

const uploadDocumentsPage = async (req, res) => {
  const user = req.user;
  res.render("uploadDocuments", { user, style: "index.css" });
};

export {
  getAll,
  findById,
  update,
  insert,
  remove,
  addCart,
  changeRole,
  uploadDocuments,
  uploadDocumentsPage,
};
