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

import ListProduct from "../../components/ListProduct";
import AddProduct from "../../components/AddProduct";
import EditProduct from "../../components/EditProduct";

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
    // <>
    //   <Navbar key={expand} bg="light" expand={expand} className="mb-3">
    //     <Container fluid>
    //       <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
    //       <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
    //       <Navbar.Offcanvas
    //         id={`offcanvasNavbar-expand-${expand}`}
    //         aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    //         placement="start"
    //       >
    //         <Offcanvas.Header closeButton>
    //           <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
    //             Offcanvas
    //           </Offcanvas.Title>
    //         </Offcanvas.Header>
    //         <Offcanvas.Body>
    //           <Nav className="justify-content-end flex-grow-1 pe-3">
    //             <Nav.Link href="#action1">Home</Nav.Link>
    //             <Nav.Link href="#action2">Link</Nav.Link>
    //             <NavDropdown
    //               title="Dropdown"
    //               id={`offcanvasNavbarDropdown-expand-${expand}`}
    //             >
    //               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
    //               <NavDropdown.Item href="#action4">
    //                 Another action
    //               </NavDropdown.Item>
    //               <NavDropdown.Divider />
    //               <NavDropdown.Item href="#action5">
    //                 Something else here
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           </Nav>
    //           <Form className="d-flex">
    //             <Form.Control
    //               type="search"
    //               placeholder="Search"
    //               className="me-2"
    //               aria-label="Search"
    //             />
    //             <Button variant="outline-success">Search</Button>
    //           </Form>
    //         </Offcanvas.Body>
    //       </Navbar.Offcanvas>
    //     </Container>
    //   </Navbar>
    // </>
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        <h2>Warehouse Management System</h2>
      </div>
      <Button onClick={logout}>Logout</Button>
      <div style={{ paddingLeft: 30 }}>
        <Nav fill variant="tabs" defaultActiveKey="link-1">
          <Nav.Item>
            <Nav.Link id={LIST_PRODUCT} onClick={itemHandler} eventKey="link-1">
              List Product
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id={EDIT_PRODUCT} onClick={itemHandler} eventKey="link-2">
              Edit Product
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id={ADD_PRODUCT} onClick={itemHandler} eventKey="link-3">
              Add Product
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {(() => {
          switch (page) {
            case LIST_PRODUCT:
              return <ListProduct />;
            case EDIT_PRODUCT:
              return <EditProduct />;
            case ADD_PRODUCT:
              return <AddProduct />;
            default:
              return null;
          }
        })()}

        {/* <Navbar bg="light" expand="sm">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav fill variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
      </div>
    </div>
  );
}

export default AdminHomePage;
