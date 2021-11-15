var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.post('/login', csrfProtection, asyncHandler(async (req, res) => {


  res.render('questions', {});
}));

module.exports = router;
