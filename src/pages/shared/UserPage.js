import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import AdminSideBarNav from "../../components/AdminSideBarNav";
import AddUser from "../../components/AddUser";
import ListUser from "../../components/ListUsers";

const LIST_USERS = "list_users";
const ADD_USER = "add_user";

function UserPage() {
  const [page, setPage] = useState(ADD_USER);

  const componentHandler = (event) => {
    setPage(event.target.id);
  };

  return (
    <>
      <AdminSideBarNav />
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          User Management
        </h2>
        <div style={{ paddingLeft: 30 }}>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link
                id={ADD_USER}
                onClick={componentHandler}
                eventKey="link-1"
              >
                Add User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id={LIST_USERS}
                onClick={componentHandler}
                eventKey="link-3"
              >
                List Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {(() => {
            switch (page) {
              case ADD_USER:
                return <AddUser />;
              case LIST_USERS:
                return <ListUser />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default UserPage;
