const {Router} = require('express')
const { registrar, loguear } = require('../controller/auth')
const router = Router()

// ruta raíz
router.get('/', (req, res) => {
    res.send('Hello World')
  })

// Añadimos la ruta registro.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/registro', registrar/*(req, res) => 
    {res.json({
        mensaje: "ok registro"
    })
}*/)

// Añadimos la ruta login.
// Lo probamos en el postman mediante un post y nos tiene que devolver justo ese json.
router.post('/login', loguear/*(req, res) => 
    {res.json({
        mensaje: "ok login"
    })
}*/)

// Ahora, vamos a hacer uso de un controlador.
// Crearemos una carpeta llamada controller y dentro de ella crearemos nuestro archivo auth.js.


module.exports = router