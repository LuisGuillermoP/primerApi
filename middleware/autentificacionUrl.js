const {URL} = require("url")
const validar = (req , res , next) =>{
    try{
        const {origin} = req.body
        const URLFrontend = new URL(origin)
        if(URLFrontend !== "null"){
            return next();
        }else{
            throw new Error("no valida")
        }

    }catch(error){
        return res.redirect("/")
    }
}
module.exports = validar