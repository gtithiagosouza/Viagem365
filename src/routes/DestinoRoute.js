const { Router } = require('express') // 
const { auth } = require('../middleware/auth')
const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario');

const destinoRoutes = new Router()


// Cria um destino, especifico por usuario, pegando o token do sub(jwt)
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

// Lista todos destinos, especifico por usuario, pegando o token do sub(jwt)
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

// Lista um destino, especifico por usuario, pegando o token do sub(jwt)
destinoRoutes.get('/:local_id', async (req, res) => {
    try {
        // Obtém o ID do destino da URL
        const localId = req.params.local_id;
        // Obtém o ID do usuário autenticado a partir do token JWT
        const usuarioId = req.payload.sub;

        // Busca o destino pelo ID fornecido, associado ao usuário autenticado
        const destino = await Destino.findOne({
            where: {
                id: localId,
                usuario_id: usuarioId
            },
            include: [{ model: Usuario, attributes: ['nome'] }] // Junção com a tabela Usuario para obter o nome do usuário
        });

        // Verifica se o destino foi encontrado
        if (destino) {
            // Retorna as informações detalhadas do destino
            res.status(200).json(destino);
        } else {
            // Retorna uma mensagem informando que o destino não foi encontrado ou não pertence ao usuário
            res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }
    } catch (error) {
        console.error('Erro ao obter detalhes do destino:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// atualiza um destino, especifico por usuario, pegando o token do sub(jwt)
destinoRoutes.put('/:id', async (req, res) => {
    try {
        const usuarioId = req.payload.sub;
        const destinoId = req.params.id;

        // Verifica se o destino pertence ao usuário autenticado
        console.log(destinoId)

        const destino = await Destino.findOne({ where: { id: destinoId, usuario_id: usuarioId } });
    
        if (!destino) {
            return res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }

        // Atualiza as informações do destino com os dados recebidos na requisição
        destino.nome = req.body.nome || destino.nome;
        destino.descricao = req.body.descricao || destino.descricao;
        destino.localidade = req.body.localidade || destino.localidade;
        destino.coordernadas = req.body.coordernadas || destino.coordernadas;

        await destino.save();
        res.status(200).json(destino);
    } catch (error) {
        console.error('Erro ao atualizar destino:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// deleta um destino, especifico por usuario, pegando o token do sub(jwt)
destinoRoutes.delete('/:id', async (req, res) => {
    try {
        const usuarioId = req.payload.sub;
        const destinoId = req.params.id;

        // Verifica se o destino pertence ao usuário autenticado
        const destino = await Destino.findOne({ where: { id: destinoId, usuario_id: usuarioId } });
        if (!destino) {
            return res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }

        // Exclui o destino
        await destino.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir destino:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = destinoRoutes



