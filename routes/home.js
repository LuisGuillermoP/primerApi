const express = require("express")
const { leerUrls, agregarUrl } = require("../controllers/homeControllers")
const router = express.Router()

router.get("/",leerUrls)
router.post("/",agregarUrl)

module.exports = router