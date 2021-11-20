const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')


router.delete('/:id/delete', asyncHandler(async (req, res) => {
    const comment = await db.Comment.findByPk(req.params.id);
    await comment.destroy();
    return res.json({ message: req.params.id });
})
);

module.exports = router
