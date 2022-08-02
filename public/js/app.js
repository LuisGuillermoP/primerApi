
document.addEventListener("click" ,(e)=>{
        console.log(e.target.dataset.short)
    if(e.target.dataset.short){

        const shortUrl = `http://localhost:5000/${e.target.dataset.short}`

        navigator.clipboard
           .writeText(shortUrl)
           .then(console.log("copiado con exito"))
           .catch((err)=>{console.log("no se logro copiar")})
    }
})