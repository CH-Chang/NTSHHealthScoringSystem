const db = require('../utils/database');
const moment = require('moment');

const Rank = class Rank {
  constructor(grade, classes) {
    this.grade = grade;
    this.classes = classes;
  }

  static fetchGradeOne() {
    let now = moment().format('YYYY-MM-DD');
    return db.execute(
      'select C.grade, C.class as classes from record as R, class as C where R.class=C.id and C.grade=1 and R.date=? group by R.date, R.class order by R.grade desc ;',
      [now]
    );
  }
  static fetchGradeTwo() {
    let now = moment().format('YYYY-MM-DD');
    return db.execute(
      'select C.grade, C.class as classes from record as R, class as C where R.class=C.id and C.grade=1 and R.date=? group by R.date, R.class order by R.grade desc ;',
      [now]
    );
  }
  static fetchGradeThree() {
    let now = moment().format('YYYY-MM-DD');
    return db.execute(
      'select C.grade, C.class as classes from record as R, class as C where R.class=C.id and C.grade=1 and R.date=? group by R.date, R.class order by R.grade desc ;',
      [now]
    );
  }
};

module.exports = Rank;
