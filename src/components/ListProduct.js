import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  updateEditedProduct,
  getPaginatedProducts,
} from "../service/productservice";
import { FaEdit, FaWindows } from "react-icons/fa";
import ProductModel from "../model/ProductModel";

const NAME = "name";
const DESCRIPTION = "description";
const QUANTITY = "quantity";
const PRICE = "price";

function ListProduct(props) {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(new ProductModel());
  const [searchKey, setSearchKey] = useState("");
  const [parameter, setParameter] = useState({
    pageIndex: 0,
    q: undefined,
    pageSize: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const myElementRef = useRef(null);

  useEffect(() => {
    async function pageLoader() {
      let res = await getPaginatedProducts(parameter);
      await console.log("Payload: ", res);
      if (res.response_code === 200) {
        await console.log(res.payload);
        if (res.payload.total_size % 10 === 0) {
          setTotalPages(Math.floor(res.payload.total_size / 10));
        } else {
          setTotalPages(Math.floor(res.payload.total_size / 10) + 1);
        }
        setProductList(res.payload.data);
      }
    }
    pageLoader();
  }, []);

  function editProductHandler(id) {
    setProductToEdit({
      ...productToEdit,
      id: id,
      sku: document.getElementById(id).childNodes[1].innerText,
      name: document.getElementById(id).childNodes[2].innerText,
      description: document.getElementById(id).childNodes[3].innerText,
      quantity: document.getElementById(id).childNodes[4].innerText,
      price: document.getElementById(id).childNodes[5].innerText,
    });
    setShowModal(true);
  }

  async function updateProduct(val, field) {
    switch (field) {
      case NAME:
        await setProductToEdit({
          ...productToEdit,
          name: val,
        });
        break;
      case DESCRIPTION:
        await setProductToEdit({
          ...productToEdit,
          description: val,
        });
        break;
      case QUANTITY:
        await setProductToEdit({
          ...productToEdit,
          quantity: val,
        });
        break;
      case PRICE:
        await setProductToEdit({
          ...productToEdit,
          price: val,
        });
        break;

      default:
        return null;
    }
  }

  async function editProductSubmit(event) {
    try {
      let response = await updateEditedProduct(productToEdit);
      console.log(response);
      if (response.success && response.response_code === 200) {
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function searchProductList() {
    setCurrentPage(1);
    setParameter({
      ...parameter,
      q: searchKey,
      pageIndex: 0,
    });
    const response = await getPaginatedProducts(parameter);
    if (response.success && response.response_code === 200) {
      console.log("Paginatied Products: ", response.payload);
      if (response.payload.total_size % 10 === 0) {
        setTotalPages(Math.floor(response.payload.total_size / 10));
      } else {
        setTotalPages(Math.floor(response.payload.total_size / 10) + 1);
      }
      setProductList(response.payload.data);
      if (
        response.payload.query !== null ||
        response.payload.query !== undefined
      ) {
        setParameter({
          ...parameter,
          q: response.payload.query,
        });
      }
    }
  }

  async function resetSearchResult() {
    setCurrentPage(1);
    const newParameter = {
      pageIndex: 0,
      q: undefined,
      pageSize: 10,
    };
    setParameter(newParameter);
    const response = await getPaginatedProducts(newParameter);
    if (response.success && response.response_code === 200) {
      console.log(response.payload);
      if (response.payload.total_size % 10 === 0) {
        setTotalPages(Math.floor(response.payload.total_size / 10));
      } else {
        setTotalPages(Math.floor(response.payload.total_size / 10) + 1);
      }
      setProductList(response.payload.data);
    }
  }

  // Pagination related functions
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await getPaginatedProducts(parameter);
    if (response.success && response.response_code === 200) {
      console.log(response.payload);
      setProductList(response.payload.data);
    }
  };

  const handleNextClick = () => {
    setParameter({
      ...parameter,
      pageIndex: parameter.pageIndex + 1,
    });
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    console.log("Parameter: ", parameter);
    setParameter({
      ...parameter,
      pageIndex: parameter.pageIndex - 1,
    });
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setParameter({
      ...parameter,
      pageIndex: page - 1,
    });
    setCurrentPage(page);
  };

  return (
    <div style={{ marginTop: 20 }}>
      {showModal ? (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Product SKU: {productToEdit.sku}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Product Name:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateProduct(event.target.value, NAME)
                    }
                    value={productToEdit.name}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Product Description:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateProduct(event.target.value, DESCRIPTION)
                    }
                    value={productToEdit.description}
                    style={{ flex: 1 }}
                    type="text"
                    placeholder=""
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Product Quantity:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateProduct(event.target.value, QUANTITY)
                    }
                    value={productToEdit.quantity}
                    style={{ flex: 1 }}
                    type="number"
                    placeholder="0"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Form.Label style={{ width: 150, marginRight: "10px" }}>
                    Product Price:
                  </Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateProduct(event.target.value, PRICE)
                    }
                    value={productToEdit.price}
                    style={{ flex: 1 }}
                    min="0.00"
                    step="0.01"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(event) => editProductSubmit(event)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <Form className="d-inline-flex p-2">
        <Form.Control
          id="searchInput"
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={parameter.q === undefined ? "" : parameter.q}
          onChange={(event) =>
            setParameter({
              ...parameter,
              q: event.target.value,
            })
          }
        />
        <Button onClick={() => searchProductList()} variant="outline-success">
          Search
        </Button>
        <Button
          onClick={() => resetSearchResult()}
          style={{ marginLeft: 10 }}
          variant="outline-success"
        >
          Reset
        </Button>
      </Form>
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Sku</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Quantity</th>
              <th>Price (RM)</th>
            </tr>
          </thead>
          <tbody>
            <>
              {productList.map((item, index) => {
                return (
                  <tr ref={myElementRef} key={item.id} id={item.id}>
                    <td
                      style={{
                        display: "flex",
                        justifySelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <button
                          type="button"
                          onClick={() => editProductHandler(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <FaEdit
                            style={{
                              marginRight: 2,
                              marginBotton: 5,
                              color: "green",
                              fontSize: "14px",
                            }}
                          />
                        </button>
                      </span>
                      {currentPage === 1
                        ? index + 1
                        : (currentPage - 1) * parameter.pageSize + index + 1}
                    </td>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination>
            <Pagination.Prev
              onClick={handlePrevClick}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </>
    </div>
  );
}

export default ListProduct;
