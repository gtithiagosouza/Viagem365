'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'destinos',
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
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      localidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coordernadas: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('destinos');
  }
}
