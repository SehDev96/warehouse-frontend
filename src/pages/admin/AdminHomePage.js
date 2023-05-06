import React, { useState } from "react";
import "../../styles/adminhomepage.css";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
} from "react-bootstrap";
import { FaBars } from "react-icons/fa";

import ListProduct from "../../components/ListProduct";
import AddProduct from "../../components/AddProduct";

import { useNavigate } from "react-router-dom";

const LIST_PRODUCT = "list_product";
const ADD_PRODUCT = "add_product";
const EDIT_PRODUCT = "edit_product";

function AdminHomePage(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(LIST_PRODUCT);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const expand = "test";

  const itemHandler = (event) => {
    console.log(event.target.id);
    setPage(event.target.id);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar key={expand} bg="light" expand={expand} className="mb-3">
        <Container fluid>
          {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/admin/home">Product Management</Nav.Link>
                <Nav.Link href="#action2">Transaction Management</Nav.Link>
                <Nav.Link href="#action2">User Management</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
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

export default AdminHomePage;
