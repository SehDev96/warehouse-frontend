import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRolesFromToken } from "../utils/tokenutils";
import { MANAGER, OPERATOR } from "../constants/roles";

function SideBarNav(props) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
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
              <a href="/home">Home</a>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {role === MANAGER ? (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/product">Product Management</Nav.Link>
                <Nav.Link href="/warehouse">Warehouse Management</Nav.Link>
                <Nav.Link href="/transaction">Transaction Management</Nav.Link>
                <Nav.Link href="/users">User Management</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            ) : role === OPERATOR ? (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/transaction">Transaction Management</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            ) : null}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default SideBarNav;
