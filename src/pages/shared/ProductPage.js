import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import ListProduct from "../../components/ListProduct";
import AddProduct from "../../components/AddProduct";

import AdminSideBarNav from "../../components/AdminSideBarNav";
import withAuthorization from "../../auth/withAuthorization";
import { ADMIN, MANAGER } from "../../constants/roles";

const LIST_PRODUCT = "list_product";
const ADD_PRODUCT = "add_product";

function ProductPage() {
  const [page, setPage] = useState(LIST_PRODUCT);

  const itemHandler = (event) => {
    console.log(event.target.id);
    setPage(event.target.id);
  };

  return (
    <>
      <AdminSideBarNav />
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Product Management
        </h2>
        <div style={{ paddingLeft: 30 }}>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link
                id={LIST_PRODUCT}
                onClick={itemHandler}
                eventKey="link-1"
              >
                List Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id={ADD_PRODUCT}
                onClick={itemHandler}
                eventKey="link-3"
              >
                Add Product
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {(() => {
            switch (page) {
              case LIST_PRODUCT:
                return <ListProduct />;
              case ADD_PRODUCT:
                return <AddProduct />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default withAuthorization(ProductPage, [ADMIN, MANAGER]);
