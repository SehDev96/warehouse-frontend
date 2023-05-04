export default class ProductModel {
  constructor(id, name, sku, description, quantity, price) {
    this.id = id === undefined ? "" : id;
    this.name = name === undefined ? "" : name;
    this.sku = sku === undefined ? "" : sku;
    this.description = description === undefined ? "" : description;
    this.quantity = quantity === undefined ? "" : quantity;
    this.price = price === undefined ? "" : price;
  }
}
