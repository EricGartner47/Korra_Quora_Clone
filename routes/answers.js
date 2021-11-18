const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator')
const db = require('../db/models')

const answerValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for title field')
    .isLength({ max: 50 })
    .withMessage('Title must not be more than 50 characters long'),
  check('answer')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for answer field'),
];

//API endpoint for editing an answer to a question
router.post('/:id/edit', answerValidators, asyncHandler(async (req, res) => {
  const answerToUpdate = await Answer.findByPk(answerId);
  const { content } = req.body;
  const newAnswer = {
    content,
    questionId,
  };
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    await answerToUpdate.update(newAnswer);
    res.json()
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    return res.render('answer-edit', {
      title: `Edit Answer ${answer.id}`,
      answer,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
})
);

//API endpoint for deleting an answer to a question
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const answer = await Answer.findByPk(answerId);
  await answer.destroy();
  return res.redirect('/');
})
);
module.exports = router;
