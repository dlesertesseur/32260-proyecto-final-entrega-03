import userSchema from "../models/user.model.js";
import UserDao from "../persistence/nomgoDb/user.dao.js";

const dao = new UserDao("user", userSchema);

const authenticate = async (body) => {
  const user = await dao.authenticate(body.email, body.password);
  return user;
};

const registerUser = async (body) => {
  const ret = await dao.register(body);
  return ret;
};

export { authenticate, registerUser};
