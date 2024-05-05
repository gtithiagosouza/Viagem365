const { Router, query } = require('express') // 
const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')

const loginRoutes = new Router()

loginRoutes.post('/', async (req, res) => {
  try {
      const email = req.body.email
      const password = req.body.password

      if (!email) {
          return res.status(400).json({ message: 'O email é obrigatório' })
      }

      if (!password) {
          return res.status(400).json({ message: 'O password é obrigatório' })
      }

      const usuario = await Usuario.findOne({
          where: {email:email, password:password}
      })

      if(!usuario){
          return res.status(404).json({ error: 'Nenhum aluno corresponde a email e senha fornecidos!' })
      }

      const payload = {sub: usuario.id, email: usuario.email, nome: usuario.nome}

      const token = sign(payload, process.env.SECRET_JWT)        

      res.status(200).json({Token: token})

  } catch (error) {
    console.log({message: error})
      return res.status(500).json({ error: error, message: 'Algo deu errado!' })
  }
})


module.exports = loginRoutes