// Hay que añadir la linea start en el json.
// Hay que instalar nodemon mediante npm install -g nodemon y añadir la linea dev en el json.
//console.log("Estoy haciendo una api rest"); // Descomentarlo al empezar... .
// Ahora, instalaremos express con npm install express y se nos va a añadir nuestra carpeta node-modules y otro package-lock.json.
// Y creamos nuestro servidor.
// También hay que instalar dotenv de la siguiente manera npm i dotenv.

const express = require('express')
require('dotenv').config()
const auth = require('./rutas/auth')
//console.log(process.env.puerto)
// Creación de nuestro servidor.
const app = express()

// Permitimos escritura y lectura de json
app.use(express.json())
// ruta de autenticación.
app.use('/api/user', auth)

const PORT = process.env.PORT || 3000

app.listen(PORT), () => {
    console.log("El servidor corriendo en el puerto 3000")
}
