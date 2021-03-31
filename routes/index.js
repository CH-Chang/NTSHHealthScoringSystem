var express = require('express');
var router = express.Router();
const raterController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', raterController.getAll);

module.exports = router;
