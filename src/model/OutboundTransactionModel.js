export default class OutboundTransactionModel {
    constructor(
      id,
      productId,
      productSku,
      reference,
      quantity,
      dateShipped,
      destinationId,
      destinationName,
      remarks,
      dateCreated
    ) {
      this.id = id === undefined ? "" : id;
      this.productId = productId === undefined ? "" : productId;
      this.productSku = productSku === undefined ? "" : productSku;
      this.reference = reference === undefined ? "" : reference;
      this.quantity = quantity === undefined ? "" : quantity;
      this.dateShipped = dateShipped === undefined ? "" : dateShipped;
      this.destinationId = destinationId === undefined ? "" : destinationId;
      this.destinationName = destinationName === undefined ? "" : destinationName;
      this.remarks = remarks === undefined ? "" : remarks;
      this.dateCreated = dateCreated === undefined ? "" : dateCreated;
    }
  }