const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('questions');
});

module.exports = router;
