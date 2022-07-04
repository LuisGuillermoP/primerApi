const express = require("express")
const router = express.Router()

router.get("/",  (req, res)=>{
    const urls = [{origin:"www.google.com", shortURL: "aasd1"},
                  {origin:"www.google.com", shortURL: "aasd2"},
                  {origin:"www.google.com", shortURL: "aasd3"}]
    res.render("home", { url : urls})
    //le digo que renderise la el archivo home que esta dentro de views
    //algo importante a  decir es que si los midlewards estan mostrando una pantalla , las acciones http no vana a poder hacer nada por el hecho de que los midlewrds estan antes que las acciones . Por eso es que si vas a autilizar funciones para llamar a una pagina , fijate de no utilizar midlewards que muestren algo en pantalla
    //desde el render podemos pasarle propiedades a el hbs para asi hacer los archivos dinamicos
})

module.exports = router