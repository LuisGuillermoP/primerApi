//con mongoose se pueden crear esquemas para asi formar los objetos que se exportaran a la DB
//Cada esquema se asigna a una coleccion a mongo DB y define la forma de los documentos dentro de esa coleccion
const mongoose = require("mongoose");
const { Schema } = mongoose


const urlSchema = new Schema ({

    origin: {
        type: String,
        unique: true,
        required : true
    },
    shortUrl:{
        type: String,
        unique: true , 
        required: true ,
    }
})

const Url = mongoose.model('Url', urlSchema)
module.exports = Url 