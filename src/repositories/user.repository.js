import UserDaoFactory from "../factories/user.dao.factory.js";
import config from "../config/config.js";
import User from "../entities/user.entity.js";

class UserRepository {
  constructor() {
    this.dao = UserDaoFactory.create(config.PERSISTENCE);
  }

  async create(data) {
    const userDto = await this.dao.create(data);
    return new User(userDto);
  }

  async findById(id) {
    const userDto = await this.dao.findById(id);
    return new User(userDto);
  }

  async findByEmail(email) {
    const userDto = await this.dao.findByEmail(email);
    return new User(userDto);
  }

  async authenticate(email, password) {
    const userDto = await this.dao.authenticate(email, password);
    return new User(userDto);
  }

  async register(user) {
    const userDto = await this.dao.register(user);
    return new User(userDto);
  }
}

export default UserRepository;
