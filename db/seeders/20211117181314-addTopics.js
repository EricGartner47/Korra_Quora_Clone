'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Topics', [
    {topic: 'Food', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Music', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Movies', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Health', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Sports', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Hobbies', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Technology', createdAt: new Date(), updatedAt: new Date()},
    {topic: 'Travel', createdAt: new Date(), updatedAt: new Date()}
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Topics', null, {});
  }
};
