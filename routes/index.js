var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../auth')
const { bcrypt } = require('bcryptjs');
const { isTemplateLiteral } = require('babel-types');

/* GET home page. */
router.get('/', csrfProtection, function (req, res, next) {
  res.render('home', { csrfToken: req.csrfToken() });
});

const loginValidations = [
  check("username")
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for username')
    .isLength({max: 55})
    .withMessage('Username must not be more than 55 characters long'),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email")
    .isLength({max: 55})
    .withMessage('Email address must not be more than 55 characters long')
    .isEmail()
    .withMessage('Email Address is not valid email'),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password"),
]

router.post('/login', csrfProtection, loginValidations, handleValidationErrors, asyncHandler(async (req, res) => {
  let { email, password } = req.body

  let user = await db.User.findOne({ where: { email } })



  if (user !== null) {
    // let passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())
    if (password === user.hashedPassword.toString()) {
      res.render('questions', { csrfToken: req.csrfToken() });
    }
  }
  else {
    res.render('wrong')
  }

}));

module.exports = router;
