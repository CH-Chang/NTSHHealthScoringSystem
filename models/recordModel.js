const db = require('../utils/database');

const Record = class Record {
  constructor(
    date,
    year,
    classes,
    classesId,
    itemsId,
    itemsName,
    grade,
    detail
  ) {
    this.date = date;
    this.classes = classes;
    this.itemsId = itemsId;
    this.itemsName = itemsName;
    this.rater = rater;
    this.raterName = raterName;
    this.grade = grade;
    this.detail = detail;
    this.year = year;
    this.classesId = classesId;
  }

  static getRecordByDateWithClass(req) {
    return db.execute(
      'select C.grade as year, C.class as classes, R.date, R.class as classesId, R.items as itemsId, RA.name as itemsName, R.grade, R.detail from record as R, ratingitems as RA, class as C where R.items=RA.id and R.date=? and R.class=C.id and C.class=? and C.grade=? order by R.items;',
      [req.params.time, Number(req.params.classes), Number(req.params.year)]
    );
  }

  static updateRecord(grade, detail, date, classId, itemsId) {
    return db.execute(
      'UPDATE record SET grade=?, detail=? where date=? and class=? and items=?;',
      [grade, detail, date, classId, itemsId]
    );
  }

  static addRecord(grade, detail, date, classId, itemsId, rater) {
    return db.execute(
      'INSERT INTO record (date, class, items, rater, grade, detail) value(?,?,?,?,?,?)',
      [date, classId, itemsId, 2, grade, detail]
    );
  }

  static deleteRecord(classId, date) {
    return db.execute('DELETE FROM record WHERE class=? and date=?', [
      classId,
      date
    ]);
  }

  static getCountByDateWithClass(req) {
    return db.execute(
      'SELECT COUNT(items) as count from record where date=? and class=?',
      [req.body.date, req.body.classId]
    );
  }
};

module.exports = Record;
