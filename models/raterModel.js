const db = require("../utils/database");

const Rater = class Rater {
  constructor(id, img, name, position, grade) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.position = position;
    this.grade = grade;
  }

  static fetchAll() {
    return db.execute(
      "SELECT r.id, p.img, p.name, r.position FROM personnel as p, rater as r where r.personnel=p.id;"
    );
  }

  static registerRater(personnel, position) {
    return db.execute("INSERT INTO rater (personnel, position) value (?,?)", [
      personnel,
      position,
    ]);
  }

  static deleteRaterByPersonnelId(personnelId) {
    return db.execute("DELETE FROM rater WHERE personnel=?", [personnelId]);
  }
};

module.exports = Rater;
