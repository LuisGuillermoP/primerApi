const mongoose = require("mongoose")

mongoose
.connect(process.env.URI)
.then(()=>console.log("coneccion exitosa"))
.catch(e=>console.log("no se pudo conectar" + e))
//este codigo se puede llevar al index tranuqilamente pero se separo por si es necesario mas adelante en el proyecto