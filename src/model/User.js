export default class User {
  constructor(id, username, password, role) {
    this.id = id === undefined ? "" : id;
    this.username = username === undefined ? "" : username;
    this.password = password === undefined ? "" : password;
    this.role = role === undefined ? "" : role;
  }
}
