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

module.exports = router;
