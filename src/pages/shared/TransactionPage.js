import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import InboundTransaction from "../../components/InboundTransaction";
import OutboundTransaction from "../../components/OutboundTransaction";
import AdminSideBarNav from "../../components/AdminSideBarNav";

const INBOUND_TRANSACTION = "inbound_transaction";
const OUTBOUND_TRANSACTION = "outbound_transaction";

function TransactionPage(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(INBOUND_TRANSACTION);

  const expand = "test";

  const componentHandler = (event) => {
    setPage(event.target.id);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <>
      <AdminSideBarNav />
      {/* <Navbar key={expand} bg="light" expand={expand} className="mb-3">
        <Container fluid>
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
                <Nav.Link href="/admin/transaction">
                  Transaction Management
                </Nav.Link>
                <Nav.Link href="#action2">User Management</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar> */}
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Transaction Management
        </h2>
        <div style={{ paddingLeft: 30 }}>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link
                id={INBOUND_TRANSACTION}
                onClick={componentHandler}
                eventKey="link-1"
              >
                Inbound Transaction
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id={OUTBOUND_TRANSACTION}
                onClick={componentHandler}
                eventKey="link-3"
              >
                Outbound Transaction
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {(() => {
            switch (page) {
              case INBOUND_TRANSACTION:
                return <InboundTransaction />;
              case OUTBOUND_TRANSACTION:
                return <OutboundTransaction />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default TransactionPage;
