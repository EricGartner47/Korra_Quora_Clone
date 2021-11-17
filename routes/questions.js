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

router.post('/create', csrfProtection, asyncHandler(async(req, res, next) => {
  const user = await db.User.findByPk(req.session.auth.userId);

  let { title, description, topic } = req.body;
  //const question = db.Question.build({title, description, topic, })
  // console.log(user);
}))

module.exports = router;
