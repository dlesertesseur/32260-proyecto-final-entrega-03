import UserDaoFactory from "../factories/user.dao.factory.js";
import config from "../config/config.js";

class UserRepository {
  constructor() {
    this.dao = UserDaoFactory.create(config.PERSISTENCE);
  }

  async create(data) {
    const userDto = await this.dao.create(data);
    return new User(userDto);
  }

  async findById(id) {
    const userDto = this.dao.findById(id);
    return new User(userDto);
  }
}

export default UserRepository;
