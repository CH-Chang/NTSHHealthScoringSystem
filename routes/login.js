var express = require("express");
var router = express.Router();
var loginController = require("../controllers/LoginController");
var auth = require("../middleware/auth");

/* GET home page. */
router.get("/", loginController.login);

router.post("/query", loginController.queryAccount);

module.exports = router;
