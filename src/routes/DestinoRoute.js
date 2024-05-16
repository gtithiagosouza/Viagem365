const { Router } = require('express') // 
const { auth } = require('../middleware/auth')
const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario');
const axios = require('axios');
const yup = require('yup');


const destinoRoutes = new Router()


const schema = yup.object().shape({
    nome: yup.string().required("Adicione um nome"),
    descricao: yup.string().required("Adicione uma descrição"),
    localidade: yup.string().required("Adicione uma localidade"),
    cep: yup.string().matches(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos numéricos').required('CEP é obrigatório'),
});


// Cria um destino, específico por usuário, pegando o token do sub(jwt)
destinoRoutes.post('/', async (req, res) => {
    /*  
            #swagger.tags = ['Destino'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Cadastrar um novo destino',
                schema: {
                    $nome: "Raul Medeiros",
                    $descricao: "Local Bonito",
                    $localidade: "Lagoa do Peri",
                    $cep: "88104000",
            }
        }
    */
   
    try {
    await schema.validate(req.body, { abortEarly: false });
       //*  const usuarioId = req.payload.sub  req.usuarioId  */
         const { nome, descricao, localidade, cep, } = req.body;
         const usuarioId = req.payload.sub; // req.usuarioId
                        
         const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`); 
             
            if (response.status !== 200) {
                throw new Error('Erro ao obter latitude e longitude do CEP');
            }

         const { lat, lng } = response.data;
         const destino = await Destino.create({
            nome: nome,
            descricao: descricao,
            localidade: localidade,
            coordernadas: `${lat}, ${lng}`, 
            usuario_id: usuarioId
            })

         res.status(201).json(destino)

    } catch (error) {
        if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }    
      
      res.status(500).json({ error: error.message });
    }
  });

// Lista todos destinos, específico por usuário, pegando o token do sub(jwt)
destinoRoutes.get('/', async (req, res) => {
                /*  #swagger.tags = ['Destino']
                    #swagger.description = 'Esta rota requer autenticação com um token de usuário para listar todos os destinos.' 
                    */

    try {
        const usuarioId = req.payload.sub;
       
        const destinos = await Destino.findAll({
            where: { usuario_id: usuarioId },
            include: [{ model: Usuario, attributes: ['nome'] }] // Junção com a tabela Usuario para obter o nome do usuário
        });

        if (destinos.length === 0) {
            return res.status(404).json({ message: 'Nenhum destino encontrado para este usuário' });
        }
     
        res.status(200).json(destinos);
    } catch (error) {
          res.status(500).json({ message: 'Erro interno do servidor' });
    }
}); 

// Lista um destino, específico por usuário, pegando o token do sub(jwt)
destinoRoutes.get('/:local_id', async (req, res) => {
                /*  #swagger.tags = ['Destino']
                    #swagger.description = 'Esta rota requer autenticação com um token de usuário para listar todos os destinos.' 
                    */
      
    try {
        
        const localId = req.params.local_id;
        const usuarioId = req.payload.sub;

        const destino = await Destino.findOne({
            where: {
                id: localId,
                usuario_id: usuarioId
            },
            include: [{ model: Usuario, attributes: ['nome'] }] 
        });

            
        if (destino) {
           res.status(200).json(destino);
        } else {
           res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// atualiza um destino, específico por usuário, pegando o token do sub(jwt)
destinoRoutes.put('/:id', async (req, res) => {
                 /*  #swagger.tags = ['Destino']
                    #swagger.description = 'Esta rota requer autenticação com um token de usuário para listar todos os destinos.' 
                    */  
                   
  try {
        const usuarioId = req.payload.sub;
        const destinoId = req.params.id;

        const destino = await Destino.findOne({ 
            where: { 
                id: destinoId, 
                usuario_id: usuarioId 
            } });
    
        if (!destino) {
            return res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }
       
        destino.nome = req.body.nome || destino.nome;
        destino.descricao = req.body.descricao || destino.descricao;
        destino.localidade = req.body.localidade || destino.localidade;
        destino.coordernadas = req.body.coordernadas || destino.coordernadas;

        await destino.save();
        res.status(200).json(destino);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// deleta um destino, específico por usuário, pegando o token do sub(jwt)
destinoRoutes.delete('/:id', async (req, res) => {
                /*  #swagger.tags = ['Destino']
                    #swagger.description = 'Esta rota requer autenticação com um token de usuário para listar todos os destinos.' 
                    */
    try {
        const usuarioId = req.payload.sub;
        const destinoId = req.params.id;

        
        const destino = await Destino.findOne({
             where: { 
                id: destinoId, 
                usuario_id: usuarioId 
            } });
             
       
        if (!destino) {
            return res.status(404).json({ message: 'Destino não encontrado ou não pertence ao usuário' });
        }
       
        await destino.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir destino:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = destinoRoutes



