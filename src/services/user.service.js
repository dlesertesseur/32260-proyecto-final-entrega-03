import config from "../config/config.js";
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
  return user;
};

const changeUserRole = async (id) => {
  const user = await repository.findById(id);
  if (user) {
    const unloadDocs = [];
    if (user.role === config.USER_ROLE) {
      if (user.documents) {
        config.DOC_NAMES.forEach((doc) => {
          const exists = user.documents.some(
            (existingDoc) => existingDoc.name.toUpperCase() === doc
          );
          if (!exists) {
            unloadDocs.push(doc);
          }
        });
      }

      if (unloadDocs.length > 0) {
        throw {
          status: "error",
          message: "User does not have all documents uploaded",
          unloadDocs: unloadDocs,
        };
      }
    }

    await repository.changeUserRole(
      user.id,
      user.role === config.USER_ROLE ? config.PREMIUM_ROLE : config.USER_ROLE
    );
  } else {
    throw new Error(`email ${email} not found`);
  }
};

const generateDocumentURL = (file, userName) => {
  const baseUrl = `${userName}/`;
  const fileName = file.filename;
  const documentURL = baseUrl + fileName;
  return documentURL;
};

const updateUserDocuments = async (uid, documentStatus) => {
  const userRepository = new UserRepository();

  const invalidDocuments = documentStatus.filter(
    (doc) => !config.DOC_NAMES.includes(doc.name.toUpperCase())
  );
  if (invalidDocuments.length > 0) {
    const errorText = "Invalid document name/s";
    throw new Error(
      `${errorText}: ${invalidDocuments.map((doc) => doc.name).join(", ")}`
    );
  }
  const result = await userRepository.updateDocumentsStatus(
    uid,
    documentStatus
  );
  return result;
};

const updateUserProfileImage = async (uid, documentStatus) => {
  const userRepository = new UserRepository();
  const result = await userRepository.updateDocumentsStatus(
    uid,
    documentStatus
  );
  return result;
};

const updateUserProductPhoto = async (uid, documentStatus) => {
  const userRepository = new UserRepository();
  const result = await userRepository.updateDocumentsStatus(
    uid,
    documentStatus
  );
  return result;
};

export {
  getAllUsers,
  findByEmail,
  findUserById,
  updateUser,
  insertUser,
  deleteUser,
  addCartToUser,
  changeUserRole,
  generateDocumentURL,
  updateUserDocuments,
  updateUserProfileImage,
  updateUserProductPhoto,
};
