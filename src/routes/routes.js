const { Router } = require("express");
const loginRoutes = require("./LoginRoutes");
const usuarioRoutes = require("./UsuarioRoute");

const routes = Router()



routes.use('/login', loginRoutes);
routes.use('/usuarios', usuarioRoutes);

module.exports = routes 