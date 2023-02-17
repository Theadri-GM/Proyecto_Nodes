const {response} = require('express') // Para que coja las funciones de express, porque si no, no las coge.

const registrar = (req, res = response) => {
    const {nombre, email, password }= req.body // Almacenamos los datos.
    if (password.length < 8){          // Si la longitud de la contraseña es inferior a 8, nos saltará...
        return res.status(400).json({  // Este mensaje, en el cuál mostraremos que no es válido y devolveremos el HTTP BAD REQUEST a 400.
            ok: false, 
            mensaje: " La contraseña debe tener mínimo 8 caracteres "
        })
    }
    return res.json({                                 // Mostramos los datos.
        ok : true,
        mensaje: "registro",
        nombre,
        email,
        password
    })
}

const loguear = (req, res = response) => {
    const {email, password }= req.body      // Desestructuramos los datos.
    res.json({                              // Mostramos los datos.
        ok : true,
        mensaje: "login",
        email,
        password
    })
}

module.exports = {
    registrar, loguear
}