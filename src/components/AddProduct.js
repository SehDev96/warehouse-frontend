import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ProductModel from "../model/ProductModel";
import { addProductFromCsv, insertProduct } from "../service/productservice";

const NAME = "name";
const DESCRIPTION = "description";
const QUANTITY = "quantity";
const PRICE = "price";

function AddProduct(props) {
  const [product, setProduct] = useState(new ProductModel());
  const [productList, setProductList] = useState([]);

  const test = () => {
    console.log(product);
  };

  async function addProductSubmit(event) {
    event.preventDefault();
    let response = await insertProduct(product);
    if (response.success && response.response_code === 200) {
      setProductList((productList) => [...productList, response.payload]);
    }
    console.log("Response: ", response);
  }

  async function setProductDetails(val, field) {
    switch (field) {
      case NAME:
        await setProduct({
          ...product,
          name: val,
        });
        break;
      case DESCRIPTION:
        await setProduct({
          ...product,
          description: val,
        });
        break;
      case QUANTITY:
        await setProduct({
          ...product,
          quantity: val,
        });
        break;
      case PRICE:
        await setProduct({
          ...product,
          price: val,
        });
        break;

      default:
        return null;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let response = await addProductFromCsv(formData);
    if (response.success && response.response_code === 200) {
      for (let i = 0; i < response.payload.length; i++) {
        setProductList((productList) => [...productList, response.payload[i]]);
      }
    }
  }

  return (
    <div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <Form onSubmit={addProductSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Name:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setProductDetails(event.target.value, NAME)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Description:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setProductDetails(event.target.value, DESCRIPTION)
                }
                style={{ flex: 1 }}
                type="text"
                placeholder=""
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Quantity:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setProductDetails(event.target.value, QUANTITY)
                }
                style={{ flex: 1 }}
                type="number"
                placeholder="0"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: 150, marginRight: "10px" }}>
                Product Price:
              </Form.Label>
              <Form.Control
                onChange={(event) =>
                  setProductDetails(event.target.value, PRICE)
                }
                style={{ flex: 1 }}
                min="0.00"
                step="0.01"
                type="number"
                placeholder="0.00"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formText">
            <Form.Text className="text-muted">
              Once product is added, product sku will be generated.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>

        <div
          style={{
            marginRight: 20,
            marginLeft: 20,
            borderLeft: "1px solid black",
          }}
        ></div>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile">
              <Form.Label>Upload a file (.csv)</Form.Label>
              <Form.Control type="file" name="file" accept=".csv" />
            </Form.Group>
            <div style={{ marginTop: 10 }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>

            <div style={{ marginTop: 30 }}>
              <Table style={{ fontSize: 12 }} striped bordered hover>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sample Product</td>
                    <td>This is a sample product</td>
                    <td>10</td>
                    <td>5.00</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Form>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {productList.length > 0 ? (
          <>
            <div style={{ textAlign: "center" }}>
              <h6>Added Products</h6>
            </div>
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
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AddProduct;
