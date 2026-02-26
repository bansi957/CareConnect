import "./App.css";
import Landingpage from "./pages/Landingpage";
import PatientSignUp from "./pages/PatientSignUp";
import PatientDoctorsignin from "./pages/PatientDoctorsignin";
import { Routes, Route } from "react-router-dom";
export const serverUrl = "http://localhost:3000";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/patient-signup" element={<PatientSignUp />} />
        <Route path="/signin" element={<PatientDoctorsignin />} />
      </Routes>
    </>
  );
}

export default App;
