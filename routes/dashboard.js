var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboardController');
var auth = require('../middleware/auth');

/* GET home page. */
router.get('/my', auth, dashboardController.my);
router.get('/register', auth, dashboardController.register);
router.get('/logout', auth, dashboardController.logout);
router.get('/accountManagement', auth, dashboardController.accountManagement);
router.get('/accountEdit/:id', auth, dashboardController.accountEdit);
router.get('/accountDelete/:id', auth, dashboardController.accountDelete);
router.get('/scoreManagement', auth, dashboardController.scoreManagement);
router.get(
  '/scoreEdit/:year&:classes&:time',
  auth,
  dashboardController.scoreEdit
);
router.get(
  '/scoreDelete/:year&:classes&:time',
  auth,
  dashboardController.scoreDelete
);
router.get('/newScore', auth, dashboardController.newScore);

router.post('/accountUpdate', auth, dashboardController.accountUpdate);
router.post('/passwordUpdate', auth, dashboardController.passwordUpdate);
router.post('/register/query', auth, dashboardController.queryregister);
router.post('/scoreEdit/query', auth, dashboardController.queryScoreEdit);
router.post('/newScore/query', auth, dashboardController.queryScoreAdd);
router.post('/scoreEdit/getClasses', auth, dashboardController.getClasses);

module.exports = router;
