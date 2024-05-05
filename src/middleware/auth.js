const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        console.log("Entramos no Middleware");

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "Token de autorização ausente" });
        }

        const decodedToken = verify(authorization, process.env.SECRET_JWT);
        console.log('Payload:', decodedToken);

        req['payload'] = decodedToken;     

        const usuarioId = decodedToken.sub;
        req.usuarioId = usuarioId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Autenticação Falhou!",
            cause: error.message
        });
    }
}

module.exports = { auth };