'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lodging', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      signatura: {
        type: Sequelize.STRING,
      },
      denominaci_comercial: {
        type: Sequelize.STRING,
      },
      grup: {
        type: Sequelize.STRING,
      },
      subgrup: {
        type: Sequelize.STRING,
      },
      inici_d_activitat: {
        type: Sequelize.DATE,
      },
      estat: {
        type: Sequelize.STRING,
      },
      municipi: {
        type: Sequelize.STRING,
      },
      localitat: {
        type: Sequelize.STRING,
      },
      direcci: {
        type: Sequelize.STRING,
      },
      utm_x: {
        type: Sequelize.DECIMAL,
      },
      utm_y: {
        type: Sequelize.DECIMAL,
      },
      places: {
        type: Sequelize.INTEGER,
      },
      unitats: {
        type: Sequelize.INTEGER,
      },
      explotador_s: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lodging')
  }
}