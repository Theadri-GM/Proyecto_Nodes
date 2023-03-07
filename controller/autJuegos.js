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

// Actualizar un juego.
const actualizaJuego = async( req, res = response ) => {
const {nombre} = req.params;
const { anio, categoria } = req.body;

try{
    // Actualizamos el registro con el titulo que le pase el usuario.
    const result = await Juego.updateOne(
        {_nombre: nombre},
        {$set: { nombre, anio, categoria } }
    );

    // Recogemos los resultados de la operación.
    if (result.modifiedCount === 0) {
        return res.status(404).json({
            msg:'No se ha encontrado ese juego. '
        });
    }
    return res.json({
        msg: ' Juego actualizado. '
    });
}catch(error){
    console.error(error);
    return res.status(500).json({
        msg: 'Error en el Servidor. '
    })
}

}

// Eliminar un juego.
const eliminarJuego = async (req, res) => {
    const { nombre } = req.params;

    try{
        // Eliminar el registro con el titulo especificado.
        const result = await Juego.deleteOne({_nombre: nombre});

        // Manejamos el resultado.
        if (result.deletedCount === 0 ){
            return res.status(404).json({
                msg: 'No hemos encontrado el juego.'
            });
        }

        return res.json({
            msg: 'Juego eliminado.'
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor.'
        })
    }
}

// Listar todos los juegos
const listarJuegos = async (req, res = response) => {
    try{
        const juegos = await Juego.find();

        return res.json({
            ok: true,
            juegos
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error en el servidor."
        });
    }
}

module.exports = {
    registrarJuego, buscarJuego, actualizaJuego, eliminarJuego, listarJuegos
}