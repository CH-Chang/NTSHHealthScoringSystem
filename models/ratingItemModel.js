const db = require('../utils/database');

const RatingItem = class RatingItem {
  constructor(id, type, name) {
    this.id = id;
    this.type = type;
    this.name = name;
  }

  static getIdbyName(name) {
    return db.execute('select * from ratingitems where name=?', [name]);
  }

  static getAllRatingItem() {
    return db.execute('SELECT * FROM ratingitems order by id');
  }
};

module.exports = RatingItem;
