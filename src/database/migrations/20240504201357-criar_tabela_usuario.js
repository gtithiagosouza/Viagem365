'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuarios',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sexo: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cpf: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        data_nascimento: {
          allowNull: false,
          type: Sequelize.DATE
        },
        endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            isEmail: true,
          }
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
