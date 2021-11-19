const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { check, validationResult } = require('express-validator')
const db = require('../db/models')

const answerValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for answer field'),
];

//Route to render edit answer page
router.get('/:id/edit', csrfProtection, answerValidators, asyncHandler(async(req,res)=> {
  const answer = await db.Answer.findByPk(req.params.id)
  res.render('edit-answer', {answer, csrfToken: req.csrfToken()})
}))

//Route to edit answer
router.post('/:id/edit', csrfProtection, answerValidators, asyncHandler(async(req, res) => {
  // console.log('hello')
  const user = await db.User.findByPk(req.session.auth.userId);
  const answer = await db.Answer.findByPk(req.params.id, {
    include: [db.Question]
    },
  )
  const {content} = req.body
  const validatorErrors = validationResult(req);
  const questionId = answer.Question.id;
  if (validatorErrors.isEmpty()) {
    const newAnswer = await answer.update({
      content,
      questionId: answer.Question.id,
      userId: user.id
    });
    await newAnswer.save()
    res.redirect(`/questions/${questionId}`)
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('edit-answer', { errors, content, questionId, answer, csrfToken: req.csrfToken() })
  }

}))

//API endpoint for deleting an answer to a question
router.delete('/:id/delete', asyncHandler(async (req, res) => {
  const answer = await db.Answer.findByPk(req.params.id);
  await answer.destroy();
  return res.json({ message: req.params.id });
  })
);

router.get('/:id/comment', asyncHandler(async(req, res) => {
  const answer = await db.Answer.findByPk(req.params.id, {
    include: [{
      model: db.Comment
    }]
  });
  res.render('comments', {answer})
}))
module.exports = router;
