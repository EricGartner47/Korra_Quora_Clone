'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
<<<<<<< HEAD
    Answer.belongsTo(models.User, {foreignKey: 'userId'})
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'})
    Answer.hasMany(models.Comment, {foreignKey: 'answerId'})
=======
    Answer.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Answer.belongsTo(models.Question, {foreignKey: 'questionId', onDelete: 'cascade'})
    Answer.hasMany(models.Comment, {foreignKey: 'answerId', onDelete: 'cascade'})
>>>>>>> working4
  };
  return Answer;
};
