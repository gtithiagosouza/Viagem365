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
    usuario_id: {
        type: DataTypes.INTEGER,
    },
});



Destino.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Destino.beforeCreate(async (destino, options) => {
    // Certifique-se de que o parâmetro usuarioId está presente no objeto de destino
    if (!destino.usuario_id) {
        throw new Error('Parâmetro usuarioId ausente');
    }
});


module.exports = Destino;



