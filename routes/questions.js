const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')

/* GET users listing. */
router.get('/', asyncHandler(async(req, res, next) => {
  const user = await db.User.findByPk(req.session.auth.userId)
  // console.log('1234', user)
  // console.log('1234', req.session.auth)
  res.render('questions', {user});
}));
router.get('/create',csrfProtection, asyncHandler(async(req, res, next) => {
  const topics = await db.Topic.findAll()
  res.render('add-question', {topics, csrfToken: req.csrfToken()});
}))

//Question Validators for adding a new question
const questionValidators = [
  check('question')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for question field'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for title field')
    .isLength({ max: 50 })
    .withMessage('Title must not be more than 50 characters long'),
];

router.post('/create', csrfProtection, questionValidators, asyncHandler(async(req, res) => {
  const user = await db.User.findByPk(req.session.auth.userId);

  let { title, description, userId, topicId} = req.body;
  const newQuestion = Question.build({
    title,
    description,
    userId,
    topicId
  });
}))

module.exports = router;
