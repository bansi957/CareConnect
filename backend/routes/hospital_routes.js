const express = require("express");
const hospitalRouter = express.Router();
const {
  hospitalSignUp,
  hospitalSignIn,
  hospitalSignOut,
  hospitalUpdate,
  getHospitalById,
  getAllHospitals,
} = require("../controllers/hospital_controller");
const auth_Middleware = require("../middleware/auth_middleware");

hospitalRouter.post("/hospital-signup", hospitalSignUp);
hospitalRouter.post("/hospital-signin", hospitalSignIn);
hospitalRouter.post("/hospital-signout", hospitalSignOut);
hospitalRouter.put("/hospital-update", hospitalUpdate);
hospitalRouter.get("/hospital-by-id", auth_Middleware, getHospitalById);
hospitalRouter.get("/get-all-hospitals",auth_Middleware, getAllHospitals);
module.exports = hospitalRouter;
