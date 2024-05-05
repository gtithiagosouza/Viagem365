const { Router } = require('express') // 
const Usuario = require('../models/Usuario')



const usuarioRoutes = new Router()


usuarioRoutes.post('/', async (req, res) => {
   
    try {
        const email = req.body.email
        const password = req.body.password
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const sexo = req.body.sexo
        const cpf = req.body.cpf
        const endereco = req.body.endereco

              
        if (!nome) {
            return res.status(400).json({ message: 'O nome é obrigatório' })
        }

        if (!data_nascimento) {
            return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
        }

        if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
        }

        const usuario = await Usuario.create({
            email: email,
            password: password,
            nome: nome,
            data_nascimento: data_nascimento,
            sexo: sexo,
            cpf: cpf,
            endereco: endereco
        })

        res.status(201).json(usuario)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error,
            message: 'Não possível cadastrar o aluno' })
    }
})


module.exports = usuarioRoutes