const { Router } = require('express') // 
const { auth } = require('../middleware/auth')
const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario');

const destinoRoutes = new Router()



destinoRoutes.post('/', async (req, res) => {
   
    try {
        const nome = req.body.nome
        const descricao = req.body.descricao
        const localidade = req.body.localidade
        const coordernadas  = req.body.coordernadas 
      console.log('Payload presente:', req.payload);
       const usuarioId = req.payload.sub  /* req.usuarioId  */
        
       console.log('usuarioId:', usuarioId); // Verifique o valor do usuarioId
       
       
        if (!nome) {
            return res.status(400).json({ message: 'O nome é obrigatório' })
        }

                      
        const destino = await Destino.create({
            nome: nome,
            descricao: descricao,
            localidade: localidade,
            coordernadas : coordernadas,
            usuario_id: usuarioId
            })

        res.status(201).json(destino)

    } catch (error) {
      console.log({message: error})
        res.status(500).json({ error: error,
            message: 'Não possível cadastrar o aluno' })
    }
})



destinoRoutes.get('/', async (req, res) => {

    try {
        
        const usuarioId = req.payload.sub;

        
        const destinos = await Destino.findAll({
            where: { usuario_id: usuarioId },
            include: [{ model: Usuario, attributes: ['nome'] }] // Junção com a tabela Usuario para obter o nome do usuário
        });

     
        res.status(200).json(destinos);
    } catch (error) {
        console.error('Erro ao listar destinos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


module.exports = destinoRoutes