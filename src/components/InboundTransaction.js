import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { getWarehouseCodeListWithBefore } from "../service/warehouseservice";
import InboundTransactionModel from "../model/InboundTransactionModel";
import {
  addInboundTransaction,
  addInboundTransactionCsv,
} from "../service/transactionservice";

const SKU = "sku";
const REFERENCE = "reference";
const QUANTITY = "quantity";
const DATE_RECEIVED = "date_received";
const WAREHOUSE_CODE = "warehouse_code";
const REMARKS = "remarks";

function InboundTransaction(props) {
  const [inboundTransaction, setInboundTransaction] = useState(
    new InboundTransactionModel()
  );
  const [addedInboundList, setAddedInboundList] = useState([]);
  const [warehouseCodeList, setWarehouseCodeList] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    async function pageLoader() {
      let res = await getWarehouseCodeListWithBefore();
      if (res.response_code === 200) {
        await console.log(res.payload);
        setWarehouseCodeList(res.payload);
      }
    }
    pageLoader();
  }, []);

  async function addInboundTransactionSubmit(event) {
    event.preventDefault();
    console.log("DATA TO BE SENT: ", inboundTransaction);
    if (
      inboundTransaction.productSku === null ||
      inboundTransaction.productSku === undefined ||
      inboundTransaction.productSku === ""
    ) {
      alert("Product Sku is empty.");
      return null;
    }

    if (
      inboundTransaction.warehouseCode === null ||
      inboundTransaction.warehouseCode === undefined ||
      inboundTransaction.warehouseCode === ""
    ) {
      alert("Please choose warehouse code");
      return null;
    }

    let response = await addInboundTransaction(inboundTransaction);
    if (response.success && response.response_code === 200) {
      alert(response.message);
      formRef.current.reset();
      setAddedInboundList((addedInboundList) => [
        ...addedInboundList,
        response.payload,
      ]);
    } else if (response.response_code === 500) {
      alert(response.message);
    }
    console.log("Response: ", response);
  }

  async function setInboundTransactionDetails(val, field) {
    switch (field) {
      case SKU:
        await setInboundTransaction({
          ...inboundTransaction,
          productSku: val,
        });
        break;
      case REFERENCE:
        await setInboundTransaction({
          ...inboundTransaction,
          reference: val,
        });
        break;
      case QUANTITY:
        await setInboundTransaction({
          ...inboundTransaction,
          quantity: val,
        });
        break;
      case DATE_RECEIVED:
        await setInboundTransaction({
          ...inboundTransaction,
          dateReceived: val,
        });
        break;
      case WAREHOUSE_CODE:
        await setInboundTransaction({
          ...inboundTransaction,
          warehouseCode: val,
        });
        break;
      case REMARKS:
        await setInboundTransaction({
          ...inboundTransaction,
          remarks: val,
        });
        break;

      default:
        return null;
    }
  }

  async function handleCsvSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let response = await addInboundTransactionCsv(formData);
    if (response.success && response.response_code === 200) {
      alert(response.message);
      for (let i = 0; i < response.payload.length; i++) {
        setAddedInboundList((addedInboundList) => [
          ...addedInboundList,
          response.payload[i],
        ]);
      }
    }
  }

  return (
    <div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Form ref={formRef} onSubmit={addInboundTransactionSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Sku:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setInboundTransactionDetails(event.target.value, SKU)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Reference:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setInboundTransactionDetails(event.target.value, REFERENCE)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Quantity:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setInboundTransactionDetails(event.target.value, QUANTITY)
                }
                style={{ flex: 1 }}
                type="number"
                placeholder="0"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Date Received:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setInboundTransactionDetails(
                    event.target.value,
                    DATE_RECEIVED
                  )
                }
                style={{ flex: 1 }}
                type="text"
                placeholder="DD/MM/YYYY"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Warehouse Code:
              </Form.Label>
              <Form.Select
                style={{ flex: 1 }}
                onChange={(event) =>
                  setInboundTransactionDetails(
                    event.target.value,
                    WAREHOUSE_CODE
                  )
                }
                aria-label="Location Select"
              >
                <option disabled selected value="">
                  Choose warehouse code
                </option>
                {warehouseCodeList.map((item) => {
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
                Remarks:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setInboundTransactionDetails(event.target.value, REMARKS)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Transaction
          </Button>
        </Form>

        <div
          style={{
            marginRight: 20,
            marginLeft: 20,
            borderLeft: "1px solid black",
          }}
        ></div>
        <div>
          <Form onSubmit={handleCsvSubmit}>
            <Form.Group controlId="formFile">
              <Form.Label>Upload a file (.csv)</Form.Label>
              <Form.Control type="file" name="file" accept=".csv" />
            </Form.Group>
            <div style={{ marginTop: 10 }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>

          <div style={{ marginTop: 30 }}>
            <p style={{ fontSize: 12 }}>
              Data Format for Inbound Transaction Csv File:
            </p>
            <Table style={{ fontSize: 12 }} striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>reference</th>
                  <th>date_received</th>
                  <th>product_sku</th>
                  <th>quantity</th>
                  <th>location</th>
                  <th>remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>INBOUND001</td>
                  <td>22/03/2023</td>
                  <td>SAMPLESKU1</td>
                  <td>20</td>
                  <td>LOCATION-A</td>
                  <td>Sample Inbound Transaction</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {addedInboundList.length > 0 ? (
          <>
            <div style={{ textAlign: "center" }}>
              <h6>Added Transaction</h6>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Sku</th>
                  <th>Reference</th>
                  <th>Quantity</th>
                  <th>Date Received</th>
                  <th>Warehouse Code</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {addedInboundList.map((item, index) => {
                  return (
                    <tr key={item.id} id={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.productSku}</td>
                      <td>{item.reference}</td>
                      <td>{item.quantity}</td>
                      <td>{item.dateReceived}</td>
                      <td>{item.warehouseCode}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : null}
      </div>
    </div>
  );
}
export default InboundTransaction;
