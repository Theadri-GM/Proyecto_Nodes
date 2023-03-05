const { Schema, model } = require('mongoose')

const JuegoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    anio : {
        type: String,
    },
    categoria : {
        type: String,
        require: true
    }
})

const Juegos = model('Juego', JuegoSchema)

module.exports = Juegos