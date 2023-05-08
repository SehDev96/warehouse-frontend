import jwt_decode from "jwt-decode";

export async function getRolesFromToken() {
  const token = localStorage.getItem("access_token");
  const decodedToken = jwt_decode(token);
  return decodedToken.roles;
}
