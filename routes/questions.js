const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator')
const db = require('../db/models')

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const user = await db.User.findByPk(req.session.auth.userId)
  const questions = await db.Question.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.Topic
      }
    ]
  })
  // console.log(questions[0].Topic)
  res.render('questions', { user, questions });
}));

router.get('/create', csrfProtection, asyncHandler(async (req, res, next) => {
  const topics = await db.Topic.findAll()
  res.render('add-question', { topics, csrfToken: req.csrfToken() });
}))

//Question Validators for adding a new question
const questionValidators = [
  check('topic')
    .exists({ checkFalsy: true })
    .withMessage('Please select a topic for your question'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title for your question')
    .isLength({ max: 500 })
    .withMessage('Title must not be more than 500 characters long'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for your question')
    .isLength({ max: 2000 })
    .withMessage('Question description must not be greater than 2000 characters')
];

router.post('/create', csrfProtection, questionValidators, asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.session.auth.userId);
  const topics = await db.Topic.findAll()
  let { title, description, topic } = req.body;
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const newQuestion = await db.Question.build({
      title,
      description,
      topicId: topic,
      userId: user.id
    });
    await newQuestion.save()
    res.redirect('/questions')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('add-question', { errors, topics, csrfToken: req.csrfToken() })
  }
}))

router.get('/:id/delete', asyncHandler(async (req, res) => {
  const deleteQuestion = await db.Question.findByPk(req.params.id)
  await deleteQuestion.destroy()
  res.redirect('/questions');
}))

router.get('/:id/edit', csrfProtection, questionValidators, asyncHandler(async (req, res) => {
  const topics = await db.Topic.findAll()
  const question = await db.Question.findByPk(req.params.id, {
    include: [{
      model: db.Topic
    }]
  })
  res.render('edit-question', { topics, csrfToken: req.csrfToken(), question });
}))

router.post('/:id/edit', csrfProtection, questionValidators, asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.session.auth.userId);
  const topics = await db.Topic.findAll()
  let { title, description, topic } = req.body;
  const validatorErrors = validationResult(req);
  const question = await db.Question.findByPk(req.params.id)
  if (validatorErrors.isEmpty()) {
    const newQuestion = await question.update({
      title,
      description,
      topicId: topic,
      userId: user.id
    });
    await newQuestion.save()
    res.redirect('/questions')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('edit-question', { errors, topics, question, csrfToken: req.csrfToken() })
  }
}))
module.exports = router;
