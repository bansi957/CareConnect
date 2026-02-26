const express = require("express")
const user_router = express.Router()
const { patientSignup } = require("../controllers/patient_controller")

user_router.post("/patient-signup", patientSignup)

module.exports =    user_router 