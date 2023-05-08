import jwt_decode from "jwt-decode";
import { refreshToken } from "../service/authservice";

export async function getRolesFromToken() {
  const token = localStorage.getItem("access_token");
  const decodedToken = jwt_decode(token);
  return decodedToken.roles;
}

export async function isTokenExpired() {
  const token = localStorage.getItem("access_token");
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000; // convert to seconds
  return decodedToken.exp < currentTime;
}

export async function checkAndRefreshToken() {
    isTokenExpired().then((result) => {
      if (result) {
        refreshToken();
      }
    });
  }
