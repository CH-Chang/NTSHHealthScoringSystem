const db = require('../utils/database');
const moment = require('moment');

const Record = class Record {
  constructor(grade, classes, classroom, bathroom, office, total) {
    this.grade = grade;
    this.classes = classes;
    this.classroom = classroom;
    this.bathroom = bathroom;
    this.office = office;
    this.total = total;
  }

  static fetchAll() {
    let now = moment().format('YYYY-MM-DD');
    return db.execute(
      'select class.grade, class.class as classes, C.classroom, B.bathroom , O.office, (C.classroom+B.bathroom+O.office) as total from (select R.class, sum(R.grade) as classroom from record as R, ratingitems as I, ratingtype as T where R.items=I.id and I.type=T.id and I.type=1 and R.date = ? group by R.class, T.type order by R.class asc, I.type asc) as C, (select R.class, sum(R.grade) as bathroom from record as R, ratingitems as I, ratingtype as T where R.items=I.id and I.type=T.id and I.type=2 and R.date = ? group by R.class, T.type order by R.class asc, I.type asc) as B,(select R.class, sum(R.grade) as office from record as R, ratingitems as I, ratingtype as T where R.items=I.id and I.type=T.id and I.type=3 and R.date = ? group by R.class, T.type order by R.class asc, I.type asc) as O, class where C.class=B.class and B.class=O.class and O.class=C.class and C.class=class.id;',
      [now, now, now]
    );
  }
};

module.exports = Record;
