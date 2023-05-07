import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { getWarehouseCodeList } from "../service/warehouseservice";

const SKU = "sku";
const REFERENCE = "reference";
const QUANTITY = "quantity";
const DATE_RECEIVED = "date_received";
const LOCATION = "location";
const REMARKS = "remarks";

function InboundTransaction(props) {
  const [warehouseCodeList, setWarehouseCodeList] = useState([]);

  useEffect(() => {
    async function pageLoader() {
      let res = await getWarehouseCodeList();
      if (res.response_code === 200) {
        await console.log(res.payload);
        setWarehouseCodeList(res.payload);
      }
    }
    pageLoader();
  }, []);

  return (
    <div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Form
        // onSubmit={addProductSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Sku:
              </Form.Label>
              <Form.Control
                // onChange={(event) =>
                //   setProductDetails(event.target.value, NAME)
                // }
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
                // onChange={(event) =>
                //   setProductDetails(event.target.value, DESCRIPTION)
                // }
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
                // onChange={(event) =>
                //   setProductDetails(event.target.value, QUANTITY)
                // }
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
                // onChange={(event) =>
                //   setProductDetails(event.target.value, PRICE)
                // }
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
                Location:
              </Form.Label>
              <Form.Select
                style={{ flex: 1 }}
                // onChange={(event) =>
                //   setProductDetails(event.target.value, PRICE)
                // }
                aria-label="Location Select"
              >
                <option disabled selected value="">
                  Choose warehouse code
                </option>
                {warehouseCodeList.map((item) => {
                  return (
                    <option id={item} value={item}>
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
                // onChange={(event) =>
                //   setProductDetails(event.target.value, PRICE)
                // }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
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
          <Form
          // onSubmit={handleSubmit}
          >
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
        </div>
      </div>
    </div>
  );
}
export default InboundTransaction;
