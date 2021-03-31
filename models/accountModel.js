const db = require("../utils/database");

const Account = class Account {
  constructor(id, username, password, personnel) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.personnel = personnel;
  }

  static queryAccount(req) {
    return db.execute("SELECT * FROM account where username=? and password=?", [
      req.body.username,
      req.body.password,
    ]);
  }

  static getAccountByPersonnel(personnel) {
    return db.execute("SELECT * FROM account WHERE personnel=?", [personnel]);
  }

  static updatePasswordByUsername(req) {
    console.log(req.body.username);
    return db.execute("UPDATE account SET password=? WHERE username=?;", [
      req.body.newPassword,
      req.body.username,
    ]);
  }

  static registerAccount(req, id) {
    return db.execute(
      "INSERT INTO account (username, password, personnel) value (?,?,?)",
      [req.body.username, req.body.password, id]
    );
  }
};

module.exports = Account;
