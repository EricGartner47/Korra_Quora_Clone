const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils')
const db = require('../db/models')
const { Op } = require('sequelize');

// Helper function from the search data file
router.post('/', asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.session.auth.userId)
    const { value } = req.body
    const questions = await db.Question.findAll({
        where: {
            title: { [Op.iLike]: `%${value}%` }
        },
        order: [['createdAt', 'DESC']],
        limit: 15,
        include: [
            {
                model: db.Topic
            }
        ]
    });
    const topics = await db.Topic.findAll()
    res.render('questions', { user, questions, topics });
}))

router.get('/questions/:id', asyncHandler(async (req, res, next) => {
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


module.exports = router;
