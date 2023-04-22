class ProductDto {
  constructor({ _id, title, description, code, price, status, stock, category, thumbnail }) {
    this.id = _id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
    this.thumbnail = thumbnail;
  }
}

export default ProductDto;
