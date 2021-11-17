const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { loginUser } = require('../auth');
const { check, validationResult } = require('express-validator');
// const { handleValidationErrors } = require('../auth')
const bcrypt = require('bcryptjs');
const { isTemplateLiteral } = require('babel-types');
// const { ValidationError } = require('sequelize/types');

/* GET home page. */
router.get('/', csrfProtection, function (req, res, next) {
  res.render('home', { csrfToken: req.csrfToken() });
});

const signupValidation = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username')
    .isLength({ max: 55 })
    .withMessage('Username must not be more than 55 characters long'),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email")
    .isLength({ max: 250 })
    .withMessage('Email address must not be more than 55 characters long')
    .isEmail()
    .withMessage('Email Address is not valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            throw new Error('Email already exists.');
          }
        });
    }).withMessage('Email already exists.'),
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
    .isEmail()
    .withMessage('Email Address is not valid email'),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password")
]

router.post('/login', csrfProtection, loginValidations, asyncHandler(async (req, res) => {
  let { email, password } = req.body
  let user = await db.User.findOne({
    where: { email }
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())
      if (passwordMatch) {
        loginUser(req, res, user);
        res.redirect('/questions');
        return
      }
      else {

        const errors = []
        errors.push("Email or password incorrect")
        res.render('home', {
          title: 'Login',
          errors,
          csrfToken: req.csrfToken(),
        });
      }
    }
    else {
      const errors = []
      errors.push("Email or password incorrect")
      res.render('home', {
        title: 'Login',
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('home', {
      title: 'Login',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

}));

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
}))

router.post('/signup', signupValidation, csrfProtection, asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  const user = db.User.build({
    username,
    email,
  })

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user)
    req.session.save(() => res.redirect('/questions'))
    return;
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.redirect('/signup', {
      title: 'Signup',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}))

router.post('/demo', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({
    where: { email: 'demo@demo.com' }
  })
  loginUser(req, res, user)
  req.session.save(() => res.redirect('/questions'))
}))

router.get('/logout', (req, res) => {
  //TO DO
  delete req.session.auth
  // res.redirect('/');
  req.session.save(() => res.redirect('/'))
})


module.exports = router;
