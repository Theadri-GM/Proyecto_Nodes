const {response} = require('express') // Para que coja las funciones de express, porque si no, no las coge.
const Juego = require('../modelos/Juegos')
const { generarJWT } = require('../helper/jwt')

const registrarJuego = async(req, res = response) => {
    const { nombre } = req.body
    try{
        let juego = await Juego.findOne({ nombre })
        console.log(juego)
        if (juego){
            return res.status(400).json({
                ok: false,
                mensaje: "Este juego ya existe en la BD."
            })
        }

        juego = new Juego(req.body)
        console.log(juego)
        await juego.save()

        return res.status(201).json({
            ok: true,
            mensaje: "Registro del juego realizado.",
            nombre : juego.nombre,
            anio : juego.anio,
            categoria : juego.categoria

        })
    }catch ( error ){
        return res.status(500).json({
            ok : false,
            mensaje : 'error en el servidor'
        })
    }
}

const buscarJuego = async(req, res = response) => {
    const { nombre } = req.body
    try{
        let juego = await Juego.findOne({ nombre })
        if ( !juego ){
            return res.status(400).json({
                ok: false,
                mensaje: "Juego no existe en la BD."
            })
        }
        return res.json({
            ok: true,
            mensaje: "Hemos encontrado este juego.",
            nombre,
            id : juego.id,
            nombre : juego.nombre,
            anio: juego.anio,
            categoria: juego.categoria
        })
    }
    catch( error ){
        
    }
       
}

module.exports = {
    registrarJuego, buscarJuego
}