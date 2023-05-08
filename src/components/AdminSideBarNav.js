import React from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminSideBarNav(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const expand = "test";

  return (
    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <a href="/admin/home">Home</a>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/admin/product">Product Management</Nav.Link>
              <Nav.Link href="/admin/warehouse">Warehouse Management</Nav.Link>
              <Nav.Link href="/admin/transaction">
                Transaction Management
              </Nav.Link>
              <Nav.Link href="/admin/users">User Management</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AdminSideBarNav;
