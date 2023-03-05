const {Router} = require('express')
const { registrarJuego, buscarJuego } = require('../controller/autJuegos')
const { crearJuego } = require('../controller/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validator')  
const { generarJWT } = require('../helper/jwt')
const { validarJWT } = require('../middleware/validator-token')
const router = Router()

// ruta raíz
router.get('/', (req, res) => {
    res.send('Estos son los juegos')
})

  // Añadimos la ruta registro.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/anadirJuego', [
    check('nombre', 'el nombre no puede estar vacio').notEmpty(),
    check('anio', 'el email debe de ser un email valido').isLength({max: 4}),
    check('categoria', 'la categoria no puede contener más de 500 caracteres').isLength({max : 500}),
    validarCampos
]
, validarJWT, registrarJuego)

// Añadimos la ruta login.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/buscarJuego', [
    check('nombre', 'el email debe de ser un email valido').isString(),
    validarCampos
],buscarJuego)

module.exports = router