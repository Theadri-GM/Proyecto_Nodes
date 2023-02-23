const {Router} = require('express')
const { registrar, loguear } = require('../controller/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validator')  
const router = Router()

// ruta raíz
router.get('/', (req, res) => {
    res.send('Hello World')
  })

// Añadimos la ruta registro.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/registro', [
    check('nombre', 'el nombre no puede estar vacio').notEmpty(),
    check('email', 'el email debe de ser un email valido').isEmail(),
    check('password', 'la contraseña debe tener al menos 8 caracteres').isLength({min : 8}),
    validarCampos
]
,registrar/*(req, res) => 
    {res.json({
        mensaje: "ok registro"
    })
}*/)

// Añadimos la ruta login.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/login', [
    check('email', 'el email debe de ser un email valido').isEmail(),
    check('password', 'la contraseña debe tener al menos 8 caracteres').isLength({min : 8}),
    validarCampos
],loguear/*(req, res) => 
    {res.json({
        mensaje: "ok login"
    })
}*/)

// Ahora, vamos a hacer uso de un controlador.
// Crearemos una carpeta llamada controller y dentro de ella crearemos nuestro archivo auth.js.


module.exports = router