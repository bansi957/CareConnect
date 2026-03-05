const express = require("express");
const user_router = express.Router();
const {
  patientSignup,
  patientLogin,
  patientLogout,
  getCurrentPatient,
  updateProfile,
} = require("../controllers/patient_controller");
const auth_Middleware = require("../middleware/auth_middleware");

user_router.post("/patient-signup", patientSignup);
user_router.post("/patient-signin", patientLogin);
user_router.post("/patient-logout", patientLogout);
user_router.get("/get-current-patient", auth_Middleware, getCurrentPatient);
user_router.put("/update-profile", auth_Middleware, updateProfile);
module.exports = user_router;
