export default class InboundTransactionModel {
  constructor(
    id,
    productId,
    productSku,
    reference,
    quantity,
    dateReceived,
    warehouseId,
    warehouseCode,
    remarks,
    dateCreated
  ) {
    this.id = id === undefined ? "" : id;
    this.productId = productId === undefined ? "" : productId;
    this.productSku = productSku === undefined ? "" : productSku;
    this.reference = reference === undefined ? "" : reference;
    this.quantity = quantity === undefined ? "" : quantity;
    this.dateReceived = dateReceived === undefined ? "" : dateReceived;
    this.warehouseId = warehouseId === undefined ? "" : warehouseId;
    this.warehouseCode = warehouseCode === undefined ? "" : warehouseCode;
    this.remarks = remarks === undefined ? "" : remarks;
    this.dateCreated = dateCreated === undefined ? "" : dateCreated;
  }
}
