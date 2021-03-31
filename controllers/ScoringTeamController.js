const Rater = require('../models/raterModel');


exports.getAll = async (req, res, next) => {
  let raters, records, gradeOne, gradeTwo, gradeThree;
  try {
    const getRaters = await Rater.fetchAll().then(([rows]) => {
      raters = rows;
    });
    
    
  } catch (err) {
    console.log(err);
  }
  
  

  res.render('scoringteam', {
    raters: raters,
    
  });
};