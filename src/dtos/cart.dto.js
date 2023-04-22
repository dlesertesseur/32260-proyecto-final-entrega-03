class CartDto {
  constructor({ _id, status, products }) {
    this.id = _id;
    this.status = status;
    this.products = products;
  }
}

export default CartDto;
