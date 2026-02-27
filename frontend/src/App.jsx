
import Landingpage from "./pages/Landingpage";
import PatientSignUp from "./pages/PatientSignUp";
import HospitalSignUp from "./pages/HospitalSignUp";
import PatientDoctorsignin from "./pages/PatientDoctorsignin";
import { Routes, Route } from "react-router-dom";
import useGetCurrentPatient from "./hooks/useGetCurrentPatient";
import {Navigate} from "react-router-dom"
import { useSelector } from "react-redux"
import Home from "./pages/Home";
export const serverUrl = "http://localhost:3000";
function App() {

  useGetCurrentPatient()
  const {userData}=useSelector((state)=>state.user)
  return (
    <>
      <Routes>
        <Route path="/" element={userData?<Navigate to="/home"/>:<Landingpage />} />
        <Route path="/patient-signup" element={userData?<Navigate to="/home"/>:<PatientSignUp />} />
        <Route path="/hospital-signup" element={userData?<Navigate to="/home"/>:<HospitalSignUp />} />
        <Route path="/signin" element={userData?<Navigate to="/home"/>:<PatientDoctorsignin />} />
        <Route path="/home" element={!userData?<Navigate to="/"/>:<Home/>} />
      </Routes>
    </>
  );
}

export default App;
