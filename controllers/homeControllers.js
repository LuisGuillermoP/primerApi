const Url =  require('../models/Url')
const  { nanoid } = require('nanoid')

const leerUrls =   async(req, res) => {
    // const urls = [{origin:"www.google.com", shortURL: "aasd1"},
    //               {origin:"www.google.com", shortURL: "aasd2"},
    //               {origin:"www.google.com", shortURL: "aasd3"}]
    // res.render("home", { url : urls})
    // //le digo que renderise la el archivo home que esta dentro de views
    // //algo importante a  decir es que si los midlewards estan mostrando una pantalla , las acciones http no vana a poder hacer nada por el hecho de que los midlewrds estan antes que las acciones . Por eso es que si vas a autilizar funciones para llamar a una pagina , fijate de no utilizar midlewards que muestren algo en pantalla
    // //desde el render podemos pasarle propiedades a el hbs para asi hacer los archivos dinamicos
    try{
        const urls = await Url.find({user: req.user.id}).lean()
        //la funcion find sirve para ñleer lo que contiene la base de datos , y la funcion lean sirve para indicar que quiero un archivo javascript tradicional y que no se me agranden los datos , puesto que mongo tiene un tipo de archivo esoecial que tiene multiples funciones que por ahora no trabajaremos
        res.render("home", {urls})
    }catch (error){
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}

const agregarUrl = async(req , res) =>{
    const {origin} = req.body
    try {
        const url =  new Url({origin : origin , shortUrl : nanoid(6), user: req.user.id})
        await url.save()
        //lo que realiza save es que envia la informacion a la base de datos
        req.flash("mensaje", [{msg:"Url agregada"}])
        res.redirect('/')
    } catch {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}
const eliminarUrl  = async(req, res) =>{
    const  {id} =  req.params
    //acordarse que params es para get y body es para post

    try{
        // await Url.findByIdAndDelete(id)
        //vamos a hacerlo de un modo mas seguro
        const url = await Url.findById()
        //le pasamos nuestro modelo
        if(!url.user.equals(req.user.id)){
            throw new Error("usted no es el propietario de esta url")
        }
        await url.remove()
        req.flash("mensaje", [{msg:"url eliminado"}])
        res.redirect("/");
    }catch(e){
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}
const editarUrl = async(req ,res) =>{
    const {id} = req.params

    try {
        const url = await Url.findById(id).lean()
        if(!url.user.equals(req.user.id)){
            throw new Error("usted no es el propietario de esta url")
        }
        res.render("home",{URL})
        console.log(URL)
    } catch (error) {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}

const cambiarUrl = async(req ,res) =>{
    const {id} = req.params
    const {origin} = req.body

    try {
        const url = await Url.findById(id).lean()
        if(!url.user.equals(req.user.id)){
            throw new Error("usted no es el propietario de esta url")
        }
        await url.updateOne({origin})
        req.flash("mensaje", [{msg:"La url ha sido modificada"}])
        res.redirect("/")
    } catch (error) {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}
const redireccionamiento = async(req, res) => {
    const {URLcorta} = req.params
    try{
        const urlDB = await Url.findOne({URLcorta})
        res.redirect(urlDB.origin)
    }
    catch(err){
        req.flash("mensaje", [{msg: "no existe la url requerida"}])
        res.render("/auth/login")
    }
}

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrl,
    cambiarUrl,
    redireccionamiento,
}