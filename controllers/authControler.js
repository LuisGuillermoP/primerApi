const { nanoid } = require("nanoid")
const User = require("../models/User")
const {validationResult} = require(`express-validator`)
const nodemailer = require("nodemailer");
require("dotenv").config()
const loginForm = (req , res) =>{
    res.render("login")
}

const registerForm = (req, res)=>{
    res.render("register")
}

const registerUser = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("mensajes" , errors.array())
        return res.redirect("/auth/register")
    }

    const {userName , email , password } = req.body
    try {
        let user = await User.findOne({email})
        if(user) throw new Error("the user exist")
        //lo que realiza este comando es que si encuentra este usuario me salta al catch
        user = new User({name:userName,email,password, tokenConfirm: nanoid(6)})
        //una cosa interesante del esquema es que sirve para que no nos puedan enviar mas informacion de la que pedimos , cosa que nos provocaria ciertos problemas
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.userEmail,
              pass: process.env.passEmail
            }
          });
        
          let info = await transport.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: user.email, // list of receivers
            subject: "verifica tu cuenta de correo", // Subject line
            html: `<a href:"http://localhost:5000/auth/confirmar/${user.tokenConfirm}">Verifica tu cuenta aqui</a>` // html body
          });

        await user.save()
        res.flash("mensajes" , [{msg: "revisa tu correo electronico y confirma tu cuenta"}] )
    } catch (error) {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/auth/register")
    }
}
const confirmarCuenta = async(req, res)=>{
    const {token} = req.params
    try {
        const user = await User.findOne({tokenConfirm:token})
        if (!user)throw new Error('no existe este usuario')

        user.cuentaConfirmada = true
        user.tokenConfirm = null
        await User.findByIdAndUpdate(user.__id ,{user})
        res.flash("mensajes" , [{msg: "cuenta verificada , puedes iniciar session"}])

    } catch (error) {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/auth/login")
    }
}

const loginUser = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("mensajes" , errors.array())
        return res.redirect("/auth/login")
    }
    const {userName, password} = req.body
    try {
        const user = await User.findOne(userName)
        if(!user) throw new Error("El usuario no existe")
        if(user.cuentaConfirmada) throw new Error("falta confirmar cuenta")
        if( ! await user.comparePassword(password)) throw new Error("la contraseña es incorrecta")
        res.login(user,function(err){
            if(!err) throw new Error("error al crear la session")
        })
        res.redirect("/")


    } catch (error) {
        req.flash("mensajes" ,[{msg : error.message}])
        return res.redirect("/auth/login")
    }
}

const cerrarSesion = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth/login");
    });
  };

module.exports = {
    loginForm , 
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
    cerrarSesion
}