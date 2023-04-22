import UserRepository from "../repositories/user.repository.js";

const repository = new UserRepository();

const authenticate = async (body) => {
  const user = await repository.authenticate(body.email, body.password);
  return user;
};

const registerUser = async (body) => {
  const ret = await repository.register(body);
  return ret;
};

export { authenticate, registerUser};
