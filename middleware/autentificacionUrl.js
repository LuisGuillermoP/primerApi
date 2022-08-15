const {URL} = require("url")
const validar = (req , res , next) =>{
    try{
        const {origin} = req.body
        const URLFrontend = new URL(origin)
        if(URLFrontend !== "null"){
            if(URLFrontend.protocol=== "http:" || URLFrontend.protocol === "https:"){
                return next();
            }
            throw new Error("no valida.Tiene que tener http: o https:")
        }
    }catch(error){
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/")
    }
}
module.exports = validar