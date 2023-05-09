import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Table } from "react-bootstrap";
import { getTransactionList } from "../service/transactionservice";

const PRODUCT_SKU = "PRODUCT_SKU";
const REFERENCE = "REFERENCE";
const LOCATION = "LOCATION";
const REMARKS = "REMARKS";
const DESTINATION = "DESTINATION";

const SEARCH_BY_OPTIONS = [
  DESTINATION,
  LOCATION,
  PRODUCT_SKU,
  REFERENCE,
  REMARKS,
];

function ListTransaction() {
  const [option, setOption] = useState(DESTINATION);
  const [keyword, setKeyword] = useState("");
  const [transactionList, setTransactionList] = useState([]);

  async function handleTransactionSubmit(event) {
    event.preventDefault();
    let response = await getTransactionList(option, keyword);
    if (response.success && response.response_code === 200) {
      alert(response.message);
      setTransactionList(response.payload);
    }
    console.log("Response: ", response.payload);
  }

  return (
    <>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <Form onSubmit={handleTransactionSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Search By:
              </Form.Label>
              <Form.Select
                style={{ flex: 1 }}
                onChange={(event) => setOption(event.target.value)}
                aria-label="Option Select"
              >
                {SEARCH_BY_OPTIONS.map((item) => {
                  return (
                    <option key={item} id={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Keyword:
              </Form.Label>
              <Form.Control
                onChange={(event) => setKeyword(event.target.value)}
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div style={{ marginTop: 30 }}>
        {transactionList.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reference</th>
                  <th>Date Received</th>
                  <th>Date Shipped</th>
                  <th>Product Sku</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Destination</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {transactionList.map((item, index) => {
                    return (
                      <tr key={item.id} id={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.reference}</td>
                        <td>{item.dateReceived}</td>
                        <td>{item.dateShipped}</td>
                        <td>{item.productSku}</td>
                        <td>{item.quantity}</td>
                        <td>{item.warehouseCode}</td>
                        <td>{item.destination}</td>
                        <td>{item.remarks}</td>
                      </tr>
                    );
                  })}
                </>
              </tbody>
            </Table>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ListTransaction;
