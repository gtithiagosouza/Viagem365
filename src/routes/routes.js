const { Router } = require("express");
const loginRoutes = require("./LoginRoutes");
const usuarioRoutes = require("./UsuarioRoute");
const destinoRoutes = require("./DestinoRoute");
const { auth } = require('../middleware/auth')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const routes = Router()


routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/login', loginRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/destinos', auth, destinoRoutes);
/* routes.use('/destinos/', auth, destinoRoutes);
routes.use('/destinos/:id', auth, destinoRoutes);
routes.use('/destinos/:id', auth, destinoRoutes);
routes.use('/destinos/:id', auth, destinoRoutes); */
module.exports = routes 