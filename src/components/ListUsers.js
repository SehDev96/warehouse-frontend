import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  getAllUserAdminRole,
  getAllUserManagerRole,
} from "../service/userservice";
import { ADMIN } from "../constants/roles";

function ListUser(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function pageLoader() {
      let res = null;
      if (props.role === ADMIN) {
        res = await getAllUserAdminRole();
      } else {
        res = await getAllUserManagerRole();
      }

      if (res.response_code === 200) {
        console.log(res.payload);
        setUserList(res.payload);
      }
    }
    pageLoader();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <>
            {userList.map((item, index) => {
              return (
                <tr key={item.id} id={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>
    </div>
  );
}

export default ListUser;
