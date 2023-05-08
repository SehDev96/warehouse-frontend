import React, { useState, useEffect } from "react";
import AdminSideBarNav from "../../components/AdminSideBarNav";
import ListWarehouse from "../../components/ListWarehouse";
import AddWareHouse from "../../components/AddWarehouse";

import { Nav } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import withAuthorization from "../../auth/withAuthorization";
import { ADMIN, MANAGER } from "../../constants/roles";
import { getRolesFromToken } from "../../utils/tokenutils";
import SideBarNav from "../../components/SideBarNav";

const LIST_WAREHOUSE = "list_warehouse";
const ADD_WAREHOUSE = "add_warehouse";

function WarehousePage() {
  const [page, setPage] = useState(LIST_WAREHOUSE);
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
          Warehouse Management
        </h2>
        <div style={{ paddingLeft: 30 }}>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link
                id={LIST_WAREHOUSE}
                onClick={componentHandler}
                eventKey="link-1"
              >
                List Warehouse
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id={ADD_WAREHOUSE}
                onClick={componentHandler}
                eventKey="link-3"
              >
                Add Warehouse
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {(() => {
            switch (page) {
              case LIST_WAREHOUSE:
                return <ListWarehouse />;
              case ADD_WAREHOUSE:
                return <AddWareHouse />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default withAuthorization(WarehousePage, [ADMIN, MANAGER]);
