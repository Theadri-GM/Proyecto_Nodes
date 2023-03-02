const {response} = require('express') // Para que coja las funciones de express, porque si no, no las coge.
const bcrypt = require('bcryptjs')
const Usuario = require('../modelos/Usuarios')
const { generarJWT } = require('../helper/jwt')

const salt = bcrypt.genSaltSync(10)

const registrar = async(req, res = response) => {
    const { email, password }= req.body   // Almacenamos los datos.
    try{
        let usuario = await Usuario.findOne({ email })
        //console.log(usuario)
        if ( usuario ){
            return res.status(400).json({ // Mostramos los datos.
                ok : false,
                mensaje: "Usuario ya existe en la BD."
            })
        }
        usuario = new Usuario(req.body)
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

        // generar token
        const token =  await generarJWT(usuario.id, usuario.nombre)
        return res.status(201).json({   // Mostramos los datos.
            ok : true,
            mensaje: "registro",
            nombre: usuario.nombre,
            email : usuario.email,
            password : usuario.password,
            token
    })
    }catch(error){
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        })
    }
}

const loguear = async(req, res = response) => {
    const {email, password }= req.body
    try{
    let usuario = await Usuario.findOne({ email })
        if( !usuario ){
            // Desestructuramos los datos.
            return res.status(400).json({// Mostramos los datos.
                ok : false,
                mensaje: "usuario no existe en la BD.",
            })
        }
        if (! bcrypt.compareSync(password, usuario.password)){
            return res.status(400).json({// Mostramos los datos.
                ok : false,
                mensaje: "credenciales erróneas.",
            })
        }
        const token =  await generarJWT(usuario.id, usuario.nombre)
        return res.json({// Mostramos los datos.
            ok : true,
            mensaje: "login",
            email,
            id: usuario.id,
            token
        })
    }   catch(error){
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor.'
        })
    }
       
}

module.exports = {
    registrar, loguear
}