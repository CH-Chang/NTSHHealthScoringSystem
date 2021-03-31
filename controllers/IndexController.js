const Rater = require('../models/raterModel');
const Record = require('../models/recordOverallModel');
const Rank = require('../models/rankModel');
const moment = require('moment');

exports.getAll = async (req, res, next) => {
  let raters, records, gradeOne, gradeTwo, gradeThree;
  try {
    const getRaters = await Rater.fetchAll().then(([rows]) => {
      raters = rows;
    });
    const getRecords = await Record.fetchAll().then(([row]) => {
      records = row;
    });
    const getGradeOne = await Rank.fetchGradeOne().then(([row]) => {
      gradeOne = row;
    });
    const getGradeTwo = await Rank.fetchGradeTwo().then(([row]) => {
      gradeTwo = row;
    });
    const getGradeThree = await Rank.fetchGradeThree().then(([row]) => {
      gradeThree = row;
    });

    res.render('index', {
      raters: raters,
      records: records,
      gradeOne: gradeOne,
      gradeTwo: gradeTwo,
      gradeThree: gradeThree,
      updatetime: moment().format('YYYY/MM/DD HH:mm:ss')
    });
  } catch (err) {
    console.log(err);
  }
};
