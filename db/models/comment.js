'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Question, {foreignKey: 'questionId'})
    Comment.belongsTo(models.Answer, {foreignKey: 'answerId'})
  };
  return Comment;
};
