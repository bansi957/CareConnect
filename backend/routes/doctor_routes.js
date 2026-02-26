const express = require("express")
const { doctorSignUp, doctorSignIn, doctorSignOut } = require("../controllers/doctor_controller")
const doctorRouter = express.Router()

doctorRouter.post("/doctor-signup", doctorSignUp)
doctorRouter.post("/doctor-signin", doctorSignIn)
doctorRouter.post("/doctor-signout", doctorSignOut)


module.exports = doctorRouter