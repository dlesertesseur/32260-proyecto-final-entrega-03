import Cart from "./cart.entity.js";

class User
{
  constructor(userDto)
  {
      this.id = userDto.id.toString();
      this.lastName = userDto.last_name;
      this.firstName = userDto.first_name;
      this.email = userDto.email,
      this.age = userDto.age,
      this.role = userDto.role,
      this.cart = new Cart(userDto.cart);
  }

  getFullName()
  {
     return `${this.lastName}, ${this.firstName}`
  }
}

export default User;
