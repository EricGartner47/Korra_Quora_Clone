const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator')
const db = require('../db/models')

//Route for main questions page
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

//Route to generate 10 most recent questions for questions page
router.get('/create', csrfProtection, asyncHandler(async (req, res, next) => {
  const topics = await db.Topic.findAll()
  res.render('add-question', { topics, csrfToken: req.csrfToken() });
}))

//Route to create question
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
const answerValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for title field')
    .isLength({ max: 500 })
    .withMessage('Title must not be more than 50 characters long'),
];


router.post('/:id/answers', answerValidators, asyncHandler(async (req, res) => {
  const { content } = req.body;
  const question = await db.Question.findByPk(req.params.id)
  const user = await db.Question.findByPk(req.session.auth.userId)
  console.log("=====================++++++++++++++++++++++++")
  const validatorErrors = validationResult(req);
  const newAnswer = db.Answer.build({
    content,
    questionId: question.id,
    userId: user.id
  });
  console.log(newAnswer, "==============================================================")
  // const question = await Question.findByPk(questionId);
  if (validatorErrors.isEmpty()) {
    await newAnswer.save();
    console.log(newAnswer, "==============================================================")
    res.json({ message: "user created" })
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    return res.render('single-question', {
      title: 'Answer',
      question,
      user,
      content,
      errors,
    });
  }
})
);
//Route to indivdual question
router.get('/:id', asyncHandler(async (req, res, next) => {
  const question = await db.Question.findByPk(req.params.id, {
    include: [{
      model: db.Answer
    },
    { model: db.Topic }
    ]
  })
  const user = await db.User.findByPk(req.session.auth.userId)
  res.render('single-question', { question, user })
}))

//Route to delete question
router.get('/:id/delete', asyncHandler(async (req, res) => {
  const deleteQuestion = await db.Question.findByPk(req.params.id)
  await deleteQuestion.destroy()
  res.redirect('/questions');
}))

//Route to render edit question page
router.get('/:id/edit', csrfProtection, questionValidators, asyncHandler(async (req, res) => {
  const topics = await db.Topic.findAll()
  const question = await db.Question.findByPk(req.params.id, {
    include: [{
      model: db.Topic
    }]
  })
  res.render('edit-question', { topics, csrfToken: req.csrfToken(), question });
}))

//Route to update question
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
