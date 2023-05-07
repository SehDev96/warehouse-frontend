export default class WarehouseModel {
  constructor(id, name, code, address, city, state,description) {
    this.id = id === undefined ? "" : id;
    this.name = name === undefined ? "" : name;
    this.code = code === undefined ? "" : code;
    this.address = address === undefined ? "" : address;
    this.city = city === undefined ? "" : city;
    this.state = state === undefined ? "" : state;
    this.description = description === undefined ? "" : description;
  }
}
