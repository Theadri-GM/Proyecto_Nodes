const { response } = require('express')
const jwt = require('jsonwebtoken')
const validarJWT = (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: 'false',
            mensaje: 'No hay token de autorización'
        })
    }
    //validación
    try {
        const { id, nombre } = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.id = id
        req.nombre = nombre
        //si hay error lanzamos el error
    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            mensaje: 'No hay token de autorización'
        })
    }
    next()
}

module.exports = { validarJWT }