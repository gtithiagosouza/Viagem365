const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')
const Usuario = require('../models/Usuario');

const Destino = connection.define('destinos', {
    nome:{
        type: DataTypes.STRING,
    },
    descricao:{
        type: DataTypes.STRING,
    },
    localidade: {
        type: DataTypes.STRING,
    },
    coordernadas: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
})


Destino.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Adicione o hook beforeCreate para inserir automaticamente o usuario_id
Destino.beforeCreate(async (destino, options) => {
    // Suponha que você tenha acesso ao ID do usuário autenticado aqui
    const usuarioId = /* Obtenha o ID do usuário autenticado */
    destino.usuario_id = usuarioId;
  });
  

module.exports = Destino
