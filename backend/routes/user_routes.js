const express = require("express");
const user_router = express.Router();
const {
  patientSignup,
  patientLogin,
  patientLogout,
  getCurrentPatient,
} = require("../controllers/patient_controller");
const auth_Middleware = require("../middleware/auth_middleware");

user_router.post("/patient-signup", patientSignup);
user_router.post("/patient-signin", patientLogin);
user_router.post("/patient-logout", patientLogout);
user_router.get("/patient-profile", auth_Middleware, getCurrentPatient);
module.exports = user_router;
