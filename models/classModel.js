const db = require('../utils/database');

const Classes = class Classes {
  constructor(id, grade, classes) {
    this.id = id;
    this.grade = grade;
    this.classes = classes;
  }

  static getClassesByGrade(grade) {
    return db.execute(
      'SELECT id, grade, class as classes FROM class where grade = ? order by class;',
      [grade]
    );
  }

  static getClassIdByGradeWithClass(grade, classes) {
    return db.execute(
      'select id, grade, class as classes from class where grade=? and class=?',
      [grade, classes]
    );
  }
};

module.exports = Classes;
