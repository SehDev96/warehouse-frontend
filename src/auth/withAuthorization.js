import React, { Component } from "react";
import { getRolesFromToken } from "../utils/tokenutils";
import { logout } from "../service/authservice";
import { Navigate } from "react-router-dom";

const withAuthorization = (WrappedComponent, allowedRoles) => {
  class WithAuthorization extends Component {
    state = {
      isAuthenticated: true, // default to true to avoid flashing the unauthorized page
    };

    componentDidMount() {
      const user = localStorage.getItem("access_token");

      if (!user) {
        logout();
        this.setState({ isAuthenticated: false });
        return;
      }

      getRolesFromToken().then((roles) => {
        if (roles.some((role) => allowedRoles.includes(role))) {
          console.log("AUTHORIZED");
          this.setState({ isAuthenticated: true });
        } else {
          console.log("UNAUTHORIZED");
          this.setState({ isAuthenticated: false });
        }
      });
    }

    render() {
      if (!this.state.isAuthenticated) {
        return <Navigate to="/unauthorized" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthorization;
};

export default withAuthorization;
