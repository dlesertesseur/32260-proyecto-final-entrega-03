import UserDaoFactory from "../factories/user.dao.factory.js";
import config from "../config/config.js";
import User from "../entities/user.entity.js";
import CartDaoFactory from "../factories/cart.dao.factory.js";

class UserRepository {
  constructor() {
    this.dao = UserDaoFactory.create(config.PERSISTENCE);
    this.cartDao = CartDaoFactory.create(config.PERSISTENCE);
  }

  async create(data) {
    const userDto = await this.dao.create(data);
    return new User(userDto);
  }

  async update(id, user) {
    const userDto = await this.dao.update(id, user);
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

  async addCartToUser(uid) {
    let userDtoUpdated = null;
    const userDto = await this.dao.findById(uid);
    if (userDto.cart === null) {
      const cartDto = await this.cartDao.create({
        status: "created",
        products: [],
      });
      userDto.cart = cartDto.id;
      userDtoUpdated = await this.dao.update(userDto.id, userDto);
    }
    return userDtoUpdated;
  }
}

export default UserRepository;
