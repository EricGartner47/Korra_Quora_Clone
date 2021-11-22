'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'})
    Comment.belongsTo(models.Answer, {foreignKey: 'answerId', onDelete: 'CASCADE'})
  };
  return Comment;
};
