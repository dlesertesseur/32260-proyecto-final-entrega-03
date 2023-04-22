class Cart {
  constructor({ id, status, products }) {
    this.id = id.toString();
    this.status = status;
    this.products = products;
  }
}

export default Cart;
