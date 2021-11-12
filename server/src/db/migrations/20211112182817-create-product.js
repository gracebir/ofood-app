'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      alt: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      categorie: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      datastatus: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      button: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};