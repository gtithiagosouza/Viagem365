const { Router, query } = require('express') // 
const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')
const yup = require('yup');

const loginRoutes = new Router()




//  Rota para Login
const schema = yup.object().shape({
    email:yup.string().email().required("Adicione um email"),
    password:yup.string().required("Adicione uma senha"),
  });
 
loginRoutes.post('/', async (req, res) => {
             /*  
            #swagger.tags = ['Login'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Faça login para autenticar',
                schema: {
                    $email: "teste123@gmail.com",
                    $password: "teste123"
          }
        }
    */
  try {
    await schema.validate(req.body, { abortEarly: false });
      
    const { email, password } = req.body;

      const usuario = await Usuario.findOne({
          where: {email:email, password:password}
      })

      if(!usuario){
          return res.status(404).json({ error: 'Nenhum aluno encontrado com o email e senha fornecidos!' })
      }

      const payload = {sub: usuario.id, email: usuario.email, nome: usuario.nome}

      const token = sign(payload, process.env.SECRET_JWT)        

      res.status(200).json({Token: token})

    } catch (error) {
        if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.errors });
      }
      
      res.status(500).json({ error: error.message });
    }
  });

module.exports = loginRoutes