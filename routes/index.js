const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../auth')
const { bcrypt } = require('bcryptjs');
const { isTemplateLiteral } = require('babel-types');
const { ValidationError } = require('sequelize/types');

/* GET home page. */
router.get('/', csrfProtection, function (req, res, next) {
  res.render('home', { csrfToken: req.csrfToken() });
});

const signupValidation = [
  check("username")
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for username')
    .isLength({max: 55 })
    .withMessage('Username must not be more than 55 characters long'),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email")
    .isLength({max: 55 })
    .withMessage('Email address must not be more than 55 characters long')
    .isEmail()
    .withMessage('Email Address is not valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),,
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password")
    .isLength({ max: 55 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 55 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]


const loginValidations = [
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

router.post('/signup', csrfProtection, signupValidation, handleValidationErrors, asyncHandler(async (req, res, errors)=> {
  const {email, username, password} = req.body
  const user = db.User.build({
    username,
    email
  })
  console.log(errors)
  const hashedPassword = await bcrypt.hash(password, 10)
  user.hashedPassword = hashedPassword
  res.render('/questions')
}))

module.exports = router;
