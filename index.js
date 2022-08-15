/*En este proyecto trabajaremos con el modelo vista controlador , que se basa en dividir los controladores , las vistas y todo en su repectivo modulo*/



const express = require(`express`)
const {create} = require(`express-handlebars`)
require("dotenv").config()
const session = require(`express-session`)
const flash = require(`connect-flash`)
const csrf = require("csurf")
//estas son las variables de entorno necesarias para que mongoose funcione
require("./database/db")
const passport =  require("passport")
const User = require("./models/User")
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
app.use(session({
    secret: `gatoman`,
    resave: false,
    saveUninitialized: false,
    name: `creoq que este es un name digno`
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user , done) =>{
    done(null , {id: user._id, userName: user.userName})
})





passport.deserializeUser(async(user , done)=>{
    //es necesario revisar la base de datos en busca de ese useuario
    const userDB = await User.findById(user._id)
    if(!userDB) return 
    return done(null,{id: !userDB._id, userName: !userDB.userName})
})
app.use(express.static(__dirname + `/public`))
app.use(express.urlencoded( {extended:true }))


app.use(csrf())
app.use((req , res ,next)=>{
    res.locals.csrfToken = req.csrfToken()
    res.locals.mensajes = req.flash("mensajes")
    //esto lo que hace es enviar algo cada vez que rendericemos una pagina web dentro de la base de datos 
    next()
})

app.use("/",require("./routes/home"))
app.use("/auth", require("./routes/auth"))


const port = process.env.PORT || 5000
app.listen(port , ()=> console.log("servidor andando"))
//se tiene que configurar nodemon para que le archivos .hbs , puesto que no los lee por el mismo. Para esto se crea un archivo nodemon.json y y con la configuracion ext se elegir que tipo de archivos leera

//se instalara mongoose un modulo no realcional muuy util para la coneccion a base de datos
// tambien se instalara dotenv para gestionar las variables de entorno