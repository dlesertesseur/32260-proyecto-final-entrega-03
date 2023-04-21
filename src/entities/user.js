
class User
{
  constructor(userDto)
  {
      this.id = userDto.id;
      this.lastName = userDto.last_name;
      this.firstName = userDto.first_name;
      this.email = userDto.email,
      this.age = userDto.age,
      this.role = userDto.role,
      this.cart = userDto.cart;
  }

  getFullName()
  {
     return `${this.lastName}, ${this.firstName}`
  }
}

export default User;
