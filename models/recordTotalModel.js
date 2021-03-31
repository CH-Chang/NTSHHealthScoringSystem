const db = require("../utils/database");

const Record = class Record {
  constructor(date, year, classes, rater, grade, time) {
    this.date = date;
    this.year = year;
    this.classes = classes;
    this.rater = rater;
    this.grade = grade;
    this.time = time;
  }

  static getAllTotalRecord() {
    return db.execute(
      "select record.date, class.grade as year, class.class as classes, personnel.name as rater, sum(record.grade) as grade, record.time from record, rater, personnel, class where rater.id=record.rater and rater.personnel=personnel.id and record.class=class.id group by record.date, record.class order by record.date desc, record.class asc"
    );
  }
};

module.exports = Record;
