const mongoose = require('mongoose')

const conexion = async () => {
    try{
        mongoose.connect(process.env.DB_URL)
        console.log('Conectado a la BD')
    }catch (error){
        console.log(error)
        throw Error("Error en la conexión a la BD")
    }

}

module.exports= { conexion }