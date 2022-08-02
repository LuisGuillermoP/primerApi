const mongoose = require("mongoose")
const {Schema} = mongoose
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

    name:{
        type : String,
        lowercase: true,
        unique: true,
        require: true,
    },
    email:{
        type : String,
        lowercase: true,
        unique: true,
        require: true,
        index: {unique:true}
    },
    password:{
        type: String,
        require: true
    },
    tokenConfirm:{
        type: String,
        default: null
    },
    cuentaConfirmada:{
        type: Boolean,
        default: false
    }
})

userSchema.pre('save',function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    try {
        bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, async function(err, hash) {
                    try{
                        user.password = await hash
                        next()
                    }
                    catch(e){
                        console.log(e)
                    }
                });
        });
    } catch (error) {
        console.log(error)
    }
})
//mongooseSchema  tiene una funcion especial llamada pre de presave que sirve para realizar una tarea antes de guardar la instancia

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword,this.password)
    }
    catch(e){

    }
}

const User = mongoose.model("User", userSchema)
//a partir de el string del modelo mongo me lo pone en minuscula y lo pone en plural
module.exports = User