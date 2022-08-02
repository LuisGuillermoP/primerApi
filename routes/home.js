const express = require("express")
const { leerUrls, agregarUrl, eliminarUrl, editarUrl, cambiarUrl , redireccionamiento} = require("../controllers/homeControllers")
const validar = require("../middleware/autentificacionUrl")
const router = express.Router()

router.get("/",leerUrls)
router.post("/",validar,agregarUrl)
router.get("/eliminar/:id",eliminarUrl)
//osea que la ruta eliminar mira el id a travez de get y comunica que tengo o quiero eliminar ,creo que el id lo consigo en el async a travez del req y con eso utilizo una fincion que le dice a la base d e datos que me elimine el objeto
router.get("/editar/:id",editarUrl)
router.post("/cambiar/:id",validar,cambiarUrl)
router.get("/:URLcorta",redireccionamiento )
module.exports = router