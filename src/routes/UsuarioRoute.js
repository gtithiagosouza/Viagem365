const { Router } = require('express') // 
const Usuario = require('../models/Usuario');
const { password } = require('../config/database.config');
const yup = require('yup');

const usuarioRoutes = new Router()

    const schema = yup.object().shape({
    email:yup.string().email().required("Adicione um email"),
    password:yup.string().required("Adicione uma senha"),
    nome: yup.string().required("Adicione um nome"),
    data_nascimento: yup.string().matches(/\d{4}-\d{2}-\d{2}/gm, 'Formato invalido'),
    sexo: yup.string().required("Adicione um sexo"),
    cpf: yup.string().matches(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos numéricos').required('CPF é obrigatório'),
    endereco: yup.string().required("Adicione um endereço"),
  });


// Rota para novos usuários
usuarioRoutes.post('/', async (req, res) => {
   
    try {        
        await schema.validate(req.body, { abortEarly: false });
           const usuario = await Usuario.create(req.body);
    
        res.status(201).json(usuario);

    } catch (error) {
          if (error.name === 'ValidationError') {
          return res.status(400).json({ errors: error.errors });
        }    
        
        res.status(500).json({ error: error.message });
      }
    });

module.exports = usuarioRoutes