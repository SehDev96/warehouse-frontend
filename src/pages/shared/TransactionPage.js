import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InboundTransaction from "../../components/InboundTransaction";
import OutboundTransaction from "../../components/OutboundTransaction";
import AdminSideBarNav from "../../components/AdminSideBarNav";
import withAuthorization from "../../auth/withAuthorization";
import { ADMIN, MANAGER, OPERATOR } from "../../constants/roles";
import { getRolesFromToken } from "../../utils/tokenutils";
import SideBarNav from "../../components/SideBarNav";

const INBOUND_TRANSACTION = "inbound_transaction";
const OUTBOUND_TRANSACTION = "outbound_transaction";

function TransactionPage(props) {
  const [page, setPage] = useState(INBOUND_TRANSACTION);

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

export default withAuthorization(TransactionPage, [ADMIN, MANAGER, OPERATOR]);
