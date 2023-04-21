import mongoose from "mongoose";
import { isValidPassword } from "../../util/Crypt.js";
import config from "../../config/config.js";
import UserDto from "../../dtos/user.dto.js";
import CartDto from "../../dtos/cart.dto.js";
import ProductDto from "../../dtos/product.dto.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

class UserDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      users = await this.collection.find().lean();

      const list = users.map((user) => {
        return new UserDto({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
          cart: new CartDto(user.cart),
        });
      });

      return list;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      let user = await this.collection.findOne({ email: email }).lean();

      const userDto = new UserDto({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: new CartDto(user.cart),
      });

      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const user = await this.collection.create(data);
      const userDto = new UserDto({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: new CartDto(user.cart),
      });
      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let user = await this.collection.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });

      const userDto = new UserDto({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: new CartDto(user.cart),
      });
      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.collection.deleteOne({ _id: id });

      const userDto = new UserDto({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: new CartDto(user.cart),
      });
      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(email, password) {
    try {
      let user = await this.findByEmail(email);
      if (user) {
        if (isValidPassword(user, password)) {
          const userDto = new UserDto({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: new CartDto(user.cart),
          });
          return userDto;
        } else {
          throw { status: 401, message: "Unauthorized - password error" };
        }
      } else {
        throw { status: 404, message: "email not found" };
      }
    } catch (error) {
      throw error;
    }
  }

  // async findById(id) {
  //   let cart = null;
  //   try {
  //     const user = await this.collection.findById(id).populate("cart").lean();

  //     if (user?.cart) {
  //       cart = {
  //         id: cart._id,
  //         products: cart.products?.map((prod) => {
  //           return new ProductDto({
  //             id: prod.id,
  //             title: prod.title,
  //             description: prod.description,
  //             code: prod.code,
  //             price: prod.price,
  //             status: prod.status,
  //             stock: prod.stock,
  //             category: prod.category,
  //             thumbnail: prod.thumbnail,
  //           });
  //         }),
  //       };
  //     }

  //     const userDto = new UserDto({
  //       id: user._id,
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       email: user.email,
  //       age: user.age,
  //       role: user.role,
  //       cart: new CartDto(cart),
  //     });
  //     return userDto;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async findById(id) {
    let cart = null;
    try {
      const user = await this.collection.findById(id).lean();

      const userDto = new UserDto({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: cart._id,
      });
      
      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async register(user) {
    try {
      let userFound = await this.findByEmail(user.email);
      if (userFound) {
        throw { status: 409, message: "Conflict - User email already exists" };
      } else {
        const user = await this.collection.create(user);
        const userDto = new UserDto({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
          cart: new CartDto(user.cart),
        });
        return userDto;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserDao;
