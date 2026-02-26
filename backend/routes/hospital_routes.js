const express = require("express")
const hospitalRouter = express.Router()
const { hospitalSignUp, hospitalSignIn, hospitalSignOut } = require("../controllers/hospital_controller")

hospitalRouter.post("/hospital-signup", hospitalSignUp)
hospitalRouter.post("/hospital-signin", hospitalSignIn)
hospitalRouter.post("/hospital-signout", hospitalSignOut)

module.exports = hospitalRouter  
