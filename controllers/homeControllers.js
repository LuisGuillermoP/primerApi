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
        const urls = await Url.find().lean()
        //la funcion find sirve para ñleer lo que contiene la base de datos , y la funcion lean sirve para indicar que quiero un archivo javascript tradicional y que no se me agranden los datos , puesto que mongo tiene un tipo de archivo esoecial que tiene multiples funciones que por ahora no trabajaremos
        res.render("home", {urls})
    }catch (error){
        console.log(error)
        res.send('fallo algo')
    }
}

const agregarUrl = async(req , res) =>{
    const {origin} = req.body
    try {
        const url =  new Url({origin : origin , shortUrl : nanoid(6)})
        await url.save()
        //lo que realiza save es que envia la informacion a la base de datos
        res.redirect('/')
    } catch {
        console.log('error')
        res.send('error en agregar url')
    }
}
const eliminarUrl  = async(req, res) =>{
    const  {id} =  req.params
    //acordarse que params es para get y body es para post

    try{
        await Url.findByIdAndDelete(id)
        //le pasamos nuestro modelo
        res.redirect("/");
    }catch(e){
        console.log('no se pudo eliminar')
        res.send('error algo fallo')
    }
}
const editarUrl = async(req ,res) =>{
    const {id} = req.params
    try {
        const URL = await Url.findById(id).lean()
        res.render("home",{URL})
        console.log(URL)
    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
}

const cambiarUrl = async(req ,res) =>{
    const {id} = req.params
    const {origin} = req.body
    try {
        await Url.findByIdAndUpdate(id,{origin})
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
}
const redireccionamiento = async(req, res) => {
    const {URLcorta} = req.params
    try{
        const urlDB = await Url.findOne({URLcorta})
        res.redirect(urlDB.origin)
    }
    catch(err){

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