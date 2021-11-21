'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
<<<<<<< HEAD
    questionId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Question, {foreignKey: 'questionId'})
    Comment.belongsTo(models.Answer, {foreignKey: 'answerId'})
=======
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'})
    Comment.belongsTo(models.Answer, {foreignKey: 'answerId', onDelete: 'CASCADE'})
>>>>>>> working4
  };
  return Comment;
};
