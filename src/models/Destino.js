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

module.exports = Destino
