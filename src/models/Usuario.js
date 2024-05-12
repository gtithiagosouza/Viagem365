const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define('usuarios', {
    nome:{
        type: DataTypes.STRING,
    },
    sexo:{
        type: DataTypes.STRING,
    },
    cpf: {
        type: DataTypes.INTEGER,
    },
    data_nascimento: {
        type: DataTypes.DATE,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
})


module.exports = Usuario
