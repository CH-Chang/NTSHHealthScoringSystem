const db = require("../utils/database");

const Personnel = class Personnel {
  constructor(id, idnum, name, role, img, sex, address, time) {
    this.id = id;
    this.idnum = idnum;
    this.name = name;
    this.role = role;
    this.img = img;
    this.sex = sex;
    this.address = address;
    this.time = time;
  }

  static getAllPersonnel() {
    return db.execute(
      "SELECT P.id, P.idnum,P.name,R.role,P.img,P.sex,P.address,P.time FROM personnel as P, role as R WHERE P.role=R.id ORDER BY P.id;"
    );
  }

  static getPersonnelByUsername(username) {
    return db.execute(
      "select P.id, P.idnum, P.name, R.role, P.img, P.sex, P.address, P.time from account as A, personnel as P, role as R where A.username=? and A.personnel=P.id and P.role=R.id;",
      [username]
    );
  }

  static getPersonnelById(id) {
    return db.execute(
      "select P.id, P.idnum, P.name, R.role, P.img, P.sex, P.address, P.time from account as A, personnel as P, role as R where A.personnel=? and A.personnel=P.id and P.role=R.id;",
      [id]
    );
  }

  static getPersonnelByIdNum(IdNum) {
    return db.execute("select * from personnel where idnum=?", [IdNum]);
  }

  static updatePersonnelByIdNum(req) {
    return db.execute(
      "UPDATE personnel SET name=?, role=?, sex=?, address=? WHERE idnum=?;",
      [
        req.body.name,
        req.body.role,
        req.body.sex,
        req.body.address,
        req.body.idnum,
      ]
    );
  }

  static deletePersonnelById(id) {
    return db.execute("DELETE FROM personnel WHERE id=?", [id]);
  }

  static registerPersonnel(req) {
    return db.execute(
      "INSERT INTO personnel (idnum, name, role, img, sex, address) value (?,?,?,'/img/icon-user.svg',?,?);",
      [
        req.body.idnum,
        req.body.name,
        req.body.role,
        req.body.sex,
        req.body.address,
      ]
    );
  }
};

module.exports = Personnel;
