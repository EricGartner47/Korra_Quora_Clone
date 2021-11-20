'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    topicId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
    Question.belongsTo(models.Topic, {foreignKey: 'topicId', onDelete: 'cascade'})
    Question.hasMany(models.Answer, {foreignKey: 'questionId', onDelete: 'cascade'})
  };
  return Question;
};
