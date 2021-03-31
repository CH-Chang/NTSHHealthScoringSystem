const Record = require("../models/recordOverallModel");
const Rank = require("../models/rankModel");

exports.getAll = async (req, res, next) => {
  let raters, records, gradeOne, gradeTwo, gradeThree;
  try {
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
  } catch (err) {
    console.log(err);
  }

  res.render("rank", {
    records: records,
    gradeOne: gradeOne,
    gradeTwo: gradeTwo,
    gradeThree: gradeThree,
  });
};
