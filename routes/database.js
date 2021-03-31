var express = require('express');
var router = express.Router();
const rankController = require('../controllers/rankController');
const socoringteam = require('../controllers/ScoringTeamController');

/* GET home page. */
router.get('/rank', rankController.getAll);
router.get('/scoringteam', socoringteam.getAll);

module.exports = router;
