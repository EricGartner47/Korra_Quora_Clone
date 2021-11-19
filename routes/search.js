const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils')
const db = require('../db/models')
const { Question } = require('../db/models');
const { Op } = require('sequelize');
//Helper function from the search data file
// const searchRepo = require('../search-data/searchdata');
router.post('/', async (req, res) => {
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
})

// router.all('/search/:searchTerm', asyncHandler(async (req, res) => {
//     const searchData = req.params.searchTerm;
//     const questions = await searchRepo.searchQuestions(`%${searchData}%`);
//     return res.render('search-result', {
//         listTitle: 'Search Results',
//         questions,
//     })
// })
// )
module.exports = router;
