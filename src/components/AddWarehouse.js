import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import WarehouseModel from "../model/WarehouseModel";
import { addWarehouse, addWarehouseWithBefore } from "../service/warehouseservice";
import { Alert } from "react-bootstrap";

const WAREHOUSE_NAME = "warehouse_name";
const WAREHOUSE_CODE = "warehouse_code";
const WAREHOUSE_ADDRESS = "warehouse_address";
const WAREHOUSE_STATE = "warehouse_state";
const WAREHOUSE_CITY = "warehouse_city";
const WAREHOUSE_DESCRIPTION = "warehouse_description";

function AddWareHouse() {
  const [warehouse, setWarehouse] = useState(new WarehouseModel());
  const [addedWarehouse, setAddedWarehouse] = useState([]);

  async function addWarehouseSubmit(event) {
    event.preventDefault();
    let response = await addWarehouseWithBefore(warehouse);
    console.log("WAREHOUSE RESPONSE: ", response);
    if (response.success && response.response_code === 200) {
      alert("Warehouse Successfully Added!");
      setAddedWarehouse((addedWarehouse) => [
        ...addedWarehouse,
        response.payload,
      ]);
    } else if (response.success && response.response_code === 409) {
      alert("Warehouse Code already exists. Please choose a different code.");
    }
    console.log("Response: ", response);
  }

  async function setWarehouseDetails(val, field) {
    switch (field) {
      case WAREHOUSE_NAME:
        await setWarehouse({
          ...warehouse,
          name: val,
        });
        break;
      case WAREHOUSE_CODE:
        await setWarehouse({
          ...warehouse,
          code: val,
        });
        break;
      case WAREHOUSE_ADDRESS:
        await setWarehouse({
          ...warehouse,
          address: val,
        });
        break;
      case WAREHOUSE_STATE:
        await setWarehouse({
          ...warehouse,
          state: val,
        });
        break;
      case WAREHOUSE_CITY:
        await setWarehouse({
          ...warehouse,
          city: val,
        });
        break;
      case WAREHOUSE_DESCRIPTION:
        await setWarehouse({
          ...warehouse,
          description: val,
        });
        break;

      default:
        return null;
    }
  }

  return (
    <div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <Form onSubmit={addWarehouseSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Name:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_NAME)
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
                Code:
              </Form.Label>
              <Form.Control
                style={{ flex: 1 }}
                type="text"
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_CODE)
                }
                placeholder=""
              />
            </div>
            <Form.Text className="text-muted">
              Please ensure that the Code entered is unique.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Address:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_ADDRESS)
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
                State:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_STATE)
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
                City:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_CITY)
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
                Description:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setWarehouseDetails(event.target.value, WAREHOUSE_DESCRIPTION)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Warehouse
          </Button>
        </Form>
      </div>
      <div style={{ marginTop: 20 }}>
        {addedWarehouse.length > 0 ? (
          <>
            <div style={{ textAlign: "center" }}>
              <h6>Added Warehouse Details</h6>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {addedWarehouse.map((item, index) => {
                  return (
                    <tr key={item.id} id={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.code}</td>
                      <td>{item.address}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>{item.description}</td>
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

export default AddWareHouse;
