const express = require("express")
const {loginForm , registerForm, registerUser ,confirmarCuenta, loginUser } = require("../controllers/authControler")
const router = express.Router()
const {body} = require(`express-validator`)

router.get("/register",registerForm)
router.post("/register",[
    body("userName","ingrese un nombre valido").trim().notEmpty().escape(),
    body("email","ingrese un email valido").trim().isEmail().normalizeEmail(),
        //trim limpia los espacios vacios
        //notEmpty hace que obligatoriamente no este vacio 
        //escape nos dice que interprete cualquier cosa como un stryng
    body("password","contraseña de 6 caracteres como minimo").trim().isLength({min:6}).escape()
    .custom((value,{ req})=>{
        if(value !== req.body.repassword){
            throw new Error("no coinciden las contraseñas")
        }else{
        return value
        }
    }),
    
],registerUser)
router.get("/confirmar/:token",confirmarCuenta)
router.get("/login",loginForm)
router.post("/login",[
    body("userName","ingrese un nombre valido").trim().notEmpty().escape(),
    body("password","contraseña de 6 caracteres como minimo").trim().isLength({min:6}).escape()
],loginUser)


module.exports = router