const { QueryInterface, Sequelize } = require("sequelize");
const { password } = require("../../config/database.config");
const Usuario = require("../../models/Usuario");
const Destino = require("../../models/Destino");


module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                  nome: "Pedro Antunes",
                  sexo: "M",
                  cpf: "12345678900",
                  data_nascimento: "1980-10-10",
                  endereco: "Campo rural, 125",
                  email: "pedro@dominio.com.br",
                  password: "123456"
            },
            {
                  nome: "Maria Antunes",
                  sexo: "F",
                  cpf: "09876543211",
                  data_nascimento: "1988-8-10",
                  endereco: "Campo Alegre, 987",
                  email: "maria@dominio.com.br",
                  password: "123456"
            }
        ]);
              await Destino.bulkCreate([
                {
                    nome: "Ponta do Papagaio",
                    descricao: "Local acolhedor",
                    localidade: "Pinheira",
                    coordernadas: "-100 -5000",
                    usuario_id: "1"
                },
                {
                  nome: "Ponta do Coral",
                  descricao: "Local Bonito",
                  localidade: "Praia de Fora",
                  coordernadas: "-100 -5000",
                  usuario_id: "2"
                }
      ]);
  },

  down: async (QueryInterface, Sequelize) => {
      // Remover usuários
      await Usuario.destroy({
          where: {
              email: ["pedro@dominio.com.br", "maria@dominio.com.br"]
          }
      });

      // Remover destinos
      await Destino.destroy({
          where: {
              nome: ["Ponta do Papagaio", "Ponta do Coral"]
          }
      });
  }
};
