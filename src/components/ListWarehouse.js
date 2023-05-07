import React, { useEffect, useState } from "react";
import {
  getAllWarehouse,
  updateEditedWarehouse,
} from "../service/warehouseservice";
import Table from "react-bootstrap/Table";
import { FaEdit, FaWindows } from "react-icons/fa";
import WarehouseModel from "../model/WarehouseModel";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const WAREHOUSE_NAME = "warehouse_name";
const WAREHOUSE_CODE = "warehouse_code";
const WAREHOUSE_ADDRESS = "warehouse_address";
const WAREHOUSE_STATE = "warehouse_state";
const WAREHOUSE_CITY = "warehouse_city";
const WAREHOUSE_DESCRIPTION = "warehouse_description";

function ListWarehouse() {
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseToEdit, setWarehouseToEdit] = useState(new WarehouseModel());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function pageLoader() {
      let res = await getAllWarehouse();
      if (res.response_code === 200) {
        await console.log(res.payload);
        setWarehouseList(res.payload);
      }
    }
    pageLoader();
  }, []);

  function editWarehouseHandler(id) {
    setWarehouseToEdit({
      ...warehouseToEdit,
      id: id,
      name: document.getElementById(id).childNodes[1].innerText,
      code: document.getElementById(id).childNodes[2].innerText,
      address: document.getElementById(id).childNodes[3].innerText,
      state: document.getElementById(id).childNodes[4].innerText,
      city: document.getElementById(id).childNodes[5].innerText,
      description: document.getElementById(id).childNodes[6].innerText,
    });
    setShowModal(true);
  }

  async function updateWarehouse(val, field) {
    switch (field) {
      case WAREHOUSE_NAME:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          name: val,
        });
        break;
      case WAREHOUSE_CODE:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          code: val,
        });
        break;
      case WAREHOUSE_ADDRESS:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          address: val,
        });
        break;
      case WAREHOUSE_STATE:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          state: val,
        });
        break;
      case WAREHOUSE_CITY:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          city: val,
        });
        break;
      case WAREHOUSE_DESCRIPTION:
        await setWarehouseToEdit({
          ...warehouseToEdit,
          description: val,
        });
        break;

      default:
        return null;
    }
  }

  async function editWarehouseSubmit(event) {
    console.log("EDIT");
    try {
      let response = await updateEditedWarehouse(warehouseToEdit);
      console.log(response);
        if (response.success && response.response_code === 200) {
          setShowModal(false);
          alert("Warehouse has been updated!");
          window.location.reload();
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ marginTop: 30 }}>
      {showModal ? (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Code: {warehouseToEdit.code}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Name:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_NAME)
                    }
                    value={warehouseToEdit.name}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Code:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_CODE)
                    }
                    value={warehouseToEdit.code}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Address:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_ADDRESS)
                    }
                    value={warehouseToEdit.address}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    State:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_STATE)
                    }
                    value={warehouseToEdit.state}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    City:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_CITY)
                    }
                    value={warehouseToEdit.city}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Desription:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateWarehouse(event.target.value, WAREHOUSE_DESCRIPTION)
                    }
                    value={warehouseToEdit.description}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(event) => editWarehouseSubmit(event)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <>
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
            <>
              {warehouseList.map((item, index) => {
                return (
                  <tr key={item.id} id={item.id}>
                    <td
                      style={{
                        display: "flex",
                        justifySelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <button
                          type="button"
                          onClick={() => editWarehouseHandler(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <FaEdit
                            style={{
                              marginRight: 2,
                              marginBotton: 5,
                              color: "green",
                              fontSize: "14px",
                            }}
                          />
                        </button>
                      </span>
                      {index + 1}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </Table>
      </>
    </div>
  );
}

export default ListWarehouse;
