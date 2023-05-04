export default class LoginRequest {
  constructor(username, password) {
    this.username = username === undefined ? "" : username;
    this.password = password === undefined ? "" : password;
  }
}
