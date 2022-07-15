/*En este proyecto trabajaremos con el modelo vista controlador , que se basa en dividir los controladores , las vistas y todo en su repectivo modulo*/


const express = require(`express`)
const {create} = require(`express-handlebars`)
require("dotenv").config()
//estas son las variables de entorno necesarias para que mongoose funcione
require("./database/db")
const app = express()
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/component"]
});
app.engine(".hbs",hbs.engine);
//motor de plantilla
app.set("view engine", ".hbs");
//marca que la extension es .hbs
app.set("views","./views");
//y que va a estar dentro de la carpeta views
//con esta funcion le cambio el nombre a las extenciones de .handdlebars a .hbs
//no se muy bien que signifiacara la segunda parte de la funcion ni referencia a que hara pero la cosa es que existe y sirve para algo
//renderisar es mostrar una imagen a partir de codigo



//es necesario poner el dirname, peusto que si subimos esto a aun servidor despues podemos tener el problema de que se vaya a cualquier sitio web no deseado
//cuidado con el uso de este middleware , puesto que la carpeta utilizada sera expuestah

app.get("/login",(req,res)=>{
    res.render("login")
})

app.use(express.static(__dirname + `/public`))
app.use(express.urlencoded( {extended:true }))
app.use("/",require("./routes/home"))
app.use("/auth", require("./routes/auth"))


const port = process.env.PORT || 5000
app.listen(port , ()=> console.log("servidor andando"))
//se tiene que configurar nodemon para que le archivos .hbs , puesto que no los lee por el mismo. Para esto se crea un archivo nodemon.json y y con la configuracion ext se elegir que tipo de archivos leera

//se instalara mongoose un modulo no realcional muuy util para la coneccion a base de datos
// tambien se instalara dotenv para gestionar las variables de entorno