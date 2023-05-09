import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import OutboundTransactionModel from "../model/OutboundTransactionModel";
import {
  addOutboundTransaction,
  addOutboundTransactionFromCsv,
} from "../service/transactionservice";

const SKU = "sku";
const REFERENCE = "reference";
const QUANTITY = "quantity";
const DATE_SHIPPED = "date_shipped";
const DESTINATION = "destination";
const REMARKS = "remarks";

function OutboundTransaction(props) {
  const [outboundTransaction, setOutboundTransaction] = useState(
    new OutboundTransactionModel()
  );
  const [addedOutboundList, setAddedOutboundList] = useState([]);

  const formRef = useRef(null);

  async function addOutboundTransactionSubmit(event) {
    event.preventDefault();
    console.log("DATA TO BE SENT: ", outboundTransaction);
    if (
      outboundTransaction.productSku === null ||
      outboundTransaction.productSku === undefined ||
      outboundTransaction.productSku === ""
    ) {
      alert("Product Sku is empty.");
      return null;
    }

    let response = await addOutboundTransaction(outboundTransaction);
    if (response.success && response.response_code === 200) {
      alert(response.message);
      formRef.current.reset();
      setAddedOutboundList((addedInboundList) => [
        ...addedInboundList,
        response.payload,
      ]);
    } else if (response.response_code === 500) {
      alert(response.message);
    }
    console.log("Response: ", response);
  }

  async function setOutboundTransactionDetails(val, field) {
    switch (field) {
      case SKU:
        await setOutboundTransaction({
          ...outboundTransaction,
          productSku: val,
        });
        break;
      case REFERENCE:
        await setOutboundTransaction({
          ...outboundTransaction,
          reference: val,
        });
        break;
      case QUANTITY:
        await setOutboundTransaction({
          ...outboundTransaction,
          quantity: val,
        });
        break;
      case DATE_SHIPPED:
        await setOutboundTransaction({
          ...outboundTransaction,
          dateShipped: val,
        });
        break;
      case DESTINATION:
        await setOutboundTransaction({
          ...outboundTransaction,
          destination: val,
        });
        break;
      case REMARKS:
        await setOutboundTransaction({
          ...outboundTransaction,
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
    let response = await addOutboundTransactionFromCsv(formData);
    if (response.success && response.response_code === 200) {
      alert(response.message);
      for (let i = 0; i < response.payload.length; i++) {
        setAddedOutboundList((addedInboundList) => [
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
        <Form ref={formRef} onSubmit={addOutboundTransactionSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Sku:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setOutboundTransactionDetails(event.target.value, SKU)
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
                  setOutboundTransactionDetails(event.target.value, REFERENCE)
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
                  setOutboundTransactionDetails(event.target.value, QUANTITY)
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
                  setOutboundTransactionDetails(
                    event.target.value,
                    DATE_SHIPPED
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
                Destination:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setOutboundTransactionDetails(
                    event.target.value,
                    DESTINATION
                  )
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
                Remarks:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setOutboundTransactionDetails(event.target.value, REMARKS)
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
              Data Format for Outbound Transaction Csv File:
            </p>
            <Table style={{ fontSize: 12 }} striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>reference</th>
                  <th>date_shipped</th>
                  <th>product_sku</th>
                  <th>quantity</th>
                  <th>destination</th>
                  <th>remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>OUTBOUND001</td>
                  <td>22/03/2023</td>
                  <td>SAMPLESKU1</td>
                  <td>20</td>
                  <td>Company A</td>
                  <td>Sample Outbound Transaction</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {addedOutboundList.length > 0 ? (
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
                  <th>Date Shipped</th>
                  <th>Destination</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {addedOutboundList.map((item, index) => {
                  return (
                    <tr key={item.id} id={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.productSku}</td>
                      <td>{item.reference}</td>
                      <td>{item.quantity}</td>
                      <td>{item.dateShipped}</td>
                      <td>{item.destination}</td>
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
export default OutboundTransaction;
