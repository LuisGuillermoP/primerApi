module.exports = (req , res , next)=>{
    if(req.isAutenticated()){
        return next
    }
    res.redirect("/auth/login")
}