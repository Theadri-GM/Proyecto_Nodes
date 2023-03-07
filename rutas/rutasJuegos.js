const {Router} = require('express')
const { registrarJuego, buscarJuego, actualizaJuego, eliminarJuego, listarJuegos } = require('../controller/autJuegos')
const { crearJuego } = require('../controller/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validator')  
const { generarJWT } = require('../helper/jwt')
const { validarJWT } = require('../middleware/validator-token')
const Juegos = require('../modelos/Juegos')
const router = Router()

// ruta raíz
router.get('/', (req, res) => {
    res.send('Estos son los juegos')
})

  // Añadimos la ruta registro.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/anadirJuego', [
    check('nombre', 'el nombre no puede estar vacio').notEmpty(),
    check('anio', 'el anio debe de ser un anio valido YYYY').isLength({max: 4}),
    check('categoria', 'la categoria no puede contener más de 500 caracteres').isLength({max : 500}),
    validarCampos
]
, validarJWT, registrarJuego)

// Añadimos la ruta login.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.get('/buscarJuego', [
    check('nombre', 'el nombre debe de ser un nombre valido').isString(),
    validarCampos
], buscarJuego)

// Añadimos la ruta actualizar juego buscandolo por su nombre.
// Lo probamos en el postman mediante un put y nos tiene que actualizar el juego deseado.
router.put('/actualizarJuego/:nombre', [
    check('nombre', 'el nombre debe de ser un nombre valido').isString(),
    validarCampos
],validarJWT ,actualizaJuego)


// Añadimos la ruta para eliminar un juego.
// Lo probamos en el postman mediante un delete y nos tiene borrar el juego.
router.delete('/eliminarJuego', [
    check('nombre', 'el email debe de ser un email valido').isString(),
    validarCampos
],validarJWT ,eliminarJuego)

// Añadimos la ruta para mostrar todos los juegos.
// Lo probamos en el postman mediante un get y nos tiene que mostrar todas las peliculas.
router.get('/listarJuegos', listarJuegos)

module.exports = router