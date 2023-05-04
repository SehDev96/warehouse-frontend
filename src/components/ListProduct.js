import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAllProducts } from "../service/productservice";

function ListProduct(props) {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    async function pageLoader() {
      let res = await getAllProducts();
      await console.log("Payload: ", res);
      if (res.response_code === 200) {
        await console.log(res.payload);
        setProductList(res.payload);
      }
    }
    pageLoader();
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <Form className="d-inline-flex p-2">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Sku</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item, index) => {
            return (
              <tr key={item.id} id={item.id}>
                <td>{index + 1}</td>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListProduct;
