import React, { useState, useRef } from "react";
import User from "../model/User";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ADMIN, managerRoleList, roleList } from "../constants/roles";
import { addUserAdminRole } from "../service/userservice";

const USERNAME = "username";
const ROLE = "role";
const PASSWORD = "password";

function AddUser(props) {
  const [user, setUser] = useState(new User());
  const [addedUser, setAddedUser] = useState([]);

  const formRef = useRef(null);

  async function setUserDetails(val, field) {
    switch (field) {
      case USERNAME:
        await setUser({
          ...user,
          username: val,
        });
        break;
      case ROLE:
        await setUser({
          ...user,
          role: val,
        });
        break;
      case PASSWORD:
        await setUser({
          ...user,
          password: val,
        });
        break;
      default:
        return null;
    }
  }

  async function addWarehouseSubmit(event) {
    event.preventDefault();
    if (user.role === "") {
      alert("Please select user's role");
      return;
    }

    if (user.username === "" && user.password === "") {
      alert("Please fill on username and password");
      return;
    }

    let response = await addUserAdminRole(user);
    if (response.success && response.response_code === 200) {
      alert("User has been created!");
      formRef.current.reset();
      setAddedUser((addedUser) => [...addedUser, response.payload]);
    } else if (response.success && response.response_code === 409) {
      alert("Username exists!");
    }
    console.log("Response: ", response);
  }

  return (
    <div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <Form ref={formRef} onSubmit={addWarehouseSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Username:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setUserDetails(event.target.value, USERNAME)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
            <Form.Text className="text-muted">
              Please ensure that the Username entered is unique.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail1">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Password:
              </Form.Label>
              <Form.Control
                style={{ flex: 1 }}
                type="password"
                onChange={(event) =>
                  setUserDetails(event.target.value, PASSWORD)
                }
                placeholder=""
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail2">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Role:
              </Form.Label>
              <Form.Select
                style={{ flex: 1 }}
                onChange={(event) => setUserDetails(event.target.value, ROLE)}
                aria-label="Location Select"
              >
                <option defaultValue value="">
                  Choose role...
                </option>
                {props.role === ADMIN ? (
                  <>
                    {roleList.map((item) => {
                      return (
                        <option key={item} id={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {managerRoleList.map((item) => {
                      return (
                        <option key={item} id={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </>
                )}
              </Form.Select>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </div>
      <div style={{ marginTop: 20 }}>
        {addedUser.length > 0 ? (
          <>
            <div style={{ textAlign: "center" }}>
              <h6>Added Warehouse Details</h6>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {addedUser.map((item, index) => {
                  return (
                    <tr key={item.id} id={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.role}</td>
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

export default AddUser;
