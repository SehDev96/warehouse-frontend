import React, { useState } from "react";
import "../../styles/adminhomepage.css";

import { useNavigate } from "react-router-dom";
import AdminSideBarNav from "../../components/AdminSideBarNav";
import { CgDatabase } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineFileText } from "react-icons/ai";
import { FaIndustry } from "react-icons/fa";
import { Card } from "react-bootstrap";
function AdminHomePage(props) {

  return (
    <>
      <AdminSideBarNav />
      <div style={{ textAlign: "center" }}>
        <h2>Welcome to Warehouse Management System</h2>
        <h6>Role: Admin</h6>
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/admin/product">
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
          <Link to="/admin/users">
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
          <Link to="/admin/transaction">
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
          <Link to="/admin/warehouse">
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
      </div>
    </>
  );
}

export default AdminHomePage;
