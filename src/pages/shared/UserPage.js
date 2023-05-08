import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import AdminSideBarNav from "../../components/AdminSideBarNav";
import AddUser from "../../components/AddUser";
import ListUser from "../../components/ListUsers";
import withAuthorization from "../../auth/withAuthorization";
import { ADMIN, MANAGER } from "../../constants/roles";
import { getRolesFromToken } from "../../utils/tokenutils";
import SideBarNav from "../../components/SideBarNav";

const LIST_USERS = "list_users";
const ADD_USER = "add_user";

function UserPage() {
  const [page, setPage] = useState(ADD_USER);

  const componentHandler = (event) => {
    setPage(event.target.id);
  };

  const [role, setRole] = useState("loading");

  useEffect(() => {
    async function pageLoader() {
      try {
        const userRole = await getRolesFromToken();
        console.log(userRole[0]);
        setRole(userRole[0]);
      } catch (error) {
        console.error(error);
        setRole("error");
      }
    }
    pageLoader();
  }, []);

  return (
    <>
      {role === ADMIN ? <AdminSideBarNav /> : <SideBarNav />}
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
                return <AddUser role={role} />;
              case LIST_USERS:
                return <ListUser role={role} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default withAuthorization(UserPage, [ADMIN, MANAGER]);
