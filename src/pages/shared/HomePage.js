import React, { useState, useEffect } from "react";
import "../../styles/adminhomepage.css";

import { CgDatabase } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFileText } from "react-icons/ai";
import { FaIndustry } from "react-icons/fa";
import { Card } from "react-bootstrap";
import withAuthorization from "../../auth/withAuthorization";
import { ADMIN, MANAGER, OPERATOR } from "../../constants/roles";
import SideBarNav from "../../components/SideBarNav";
import { getRolesFromToken } from "../../utils/tokenutils";

function HomePage(props) {
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
      <SideBarNav />
      <div style={{ textAlign: "center" }}>
        <h2>Welcome to Warehouse Management System</h2>
        <h6>Role: {role}</h6>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {role === MANAGER ? (
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link to="/product">
                <Card style={{ margin: 20 }}>
                  <div style={{ margin: 20, textAlign: "center" }}>
                    <CgDatabase size={50} />
                    <Card.Title>
                      Product
                      <br /> Management
                    </Card.Title>
                  </div>
                </Card>
              </Link>
              <Link to="/users">
                <Card style={{ margin: 20 }}>
                  <div style={{ margin: 20, textAlign: "center" }}>
                    <FaUserFriends size={50} />
                    <Card.Title>
                      User
                      <br /> Management
                    </Card.Title>
                  </div>
                </Card>
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link to="/transaction">
                <Card style={{ margin: 20 }}>
                  <div style={{ margin: 20, textAlign: "center" }}>
                    <AiOutlineFileText size={50} />
                    <Card.Title>
                      Transaction
                      <br /> Management
                    </Card.Title>
                  </div>
                </Card>
              </Link>
              <Link to="/warehouse">
                <Card style={{ margin: 20 }}>
                  <div style={{ margin: 20, textAlign: "center" }}>
                    <FaIndustry size={50} />
                    <Card.Title>
                      Warehouse
                      <br /> Management
                    </Card.Title>
                  </div>
                </Card>
              </Link>
            </div>
          </>
        ) : role === OPERATOR ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="/transaction">
              <Card style={{ margin: 20 }}>
                <div style={{ margin: 20, textAlign: "center" }}>
                  <AiOutlineFileText size={50} />
                  <Card.Title>
                    Transaction
                    <br /> Management
                  </Card.Title>
                </div>
              </Card>
            </Link>
          </div>
        ) : (
          <>
            <h2>Loading</h2>
          </>
        )}
      </div>
    </>
  );
}

export default withAuthorization(HomePage, [MANAGER, OPERATOR]);
