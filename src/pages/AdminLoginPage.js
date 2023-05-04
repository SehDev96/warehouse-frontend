import React, { useState } from "react";
import ApiResponseModel from "../model/ApiResponseModel";
import { login } from "../service/authservice";
import LoginRequest from "../model/LoginRequest";
import { useNavigate } from "react-router-dom";

import "../styles/homepage.css";

const password = "password";
const username = "username";

function AdminLoginPage(props) {
  const [loginModel, setLoginModel] = useState(new LoginRequest());
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let apiResponse = new ApiResponseModel();
    apiResponse = await login(loginModel);
    if (apiResponse.response_code === 200) {
      localStorage.setItem("access_token", apiResponse.payload.access_token);
      localStorage.setItem("refresh_token", apiResponse.payload.refresh_token);
      navigate("/admin/home");
    } else if (apiResponse.status === 401) {
      alert("Login Failed: ", apiResponse.message);
    } else {
      console.log("Failed to login user");
      alert("Server Error");
    }
  };

  //   function inputChangeHandler(inputField, param) {
  //     switch (param) {
  //       case username:
  //         if (inputField.length !== 0) {
  //           setLoginModel({
  //             ...loginModel,
  //             username: inputField,
  //           });
  //           if (isEmail(inputField)) {
  //             setAllowSubmit({
  //               ...allowSubmit,
  //               email: true,
  //             });
  //           } else {
  //             setAllowSubmit({
  //               ...allowSubmit,
  //               email: false,
  //             });
  //           }
  //         } else {
  //           setEmailError(false);
  //           setLoginModel({
  //             ...loginModel,
  //             username: "",
  //           });
  //           setAllowSubmit({
  //             ...allowSubmit,
  //             email: false,
  //           });
  //         }
  //         break;
  //       case password:
  //         if (inputField.length !== 0) {
  //           setLoginModel({
  //             ...loginModel,
  //             password: inputField,
  //           });
  //           setAllowSubmit({
  //             ...allowSubmit,
  //             password: true,
  //           });
  //         } else {
  //           setLoginModel({
  //             ...loginModel,
  //             password: "",
  //           });
  //           setAllowSubmit({
  //             ...allowSubmit,
  //             password: false,
  //           });
  //         }
  //         break;
  //       default:
  //     }
  //   }

  function inputHandler(inputField, param) {
    if (param === username) {
      setLoginModel({
        ...loginModel,
        username: inputField,
      });
    } else if (param === password) {
      setLoginModel({
        ...loginModel,
        password: inputField,
      });
    }
  }

  return (
    <div className="home-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Welcome to Warehouse Admin Page!</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => inputHandler(e.target.value, username)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => inputHandler(e.target.value, password)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={loginModel.username === '' || loginModel.password === ''}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminLoginPage;
