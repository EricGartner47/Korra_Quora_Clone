'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Answer.belongsTo(models.Question, {foreignKey: 'questionId', onDelete: 'cascade'})
    Answer.hasMany(models.Comment, {foreignKey: 'answerId', onDelete: 'cascade'})
  };
  return Answer;
};
