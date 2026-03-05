import Landingpage from "./pages/Landingpage";
import PatientSignUp from "./pages/PatientSignUp";
import HospitalSignUp from "./pages/HospitalSignUp";
import PatientDoctorsignin from "./pages/PatientDoctorsignin";
import { Routes, Route } from "react-router-dom";
import useGetCurrentPatient from "./hooks/useGetCurrentPatient";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import AiSymnptomChecker from "./pages/AiSymnptomChecker";
import Hospitals from "./pages/Hospitals";
import PatientsAppointment from "./pages/PatientsAppointment";
import BookAppointment from "./pages/BookAppointment";
import PatientProfile from "./pages/PatientProfile";
import HospitalDashboard from "./pages/HospitalDashboard";
import useGetCurrentHospital from "./hooks/useGetCurrentHospital";
import AboutUs from "./pages/AboutUs";
import Solutions from "./pages/Solutions";
export const serverUrl = "http://localhost:3000";

function App() {
  useGetCurrentPatient();
  useGetCurrentHospital();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Navigate to="/home" /> : <Landingpage />}
        />
        <Route
          path="/patient-signup"
          element={userData ? <Navigate to="/home" /> : <PatientSignUp />}
        />
        <Route
          path="/hospital-signup"
          element={userData ? <Navigate to="/home" /> : <HospitalSignUp />}
        />
        <Route
          path="/signin"
          element={userData ? <Navigate to="/home" /> : <PatientDoctorsignin />}
        />
        <Route
          path="/home"
          element={!userData ? <Navigate to="/" /> : <Home />}
        />
        <Route
          path="/ai-symptom-checker"
          element={!userData ? <Navigate to="/" /> : <AiSymnptomChecker />}
        />
        <Route
          path="/hospitals"
          element={!userData ? <Navigate to="/" /> : <Hospitals />}
        />
        <Route
          path="/patients-appointments"
          element={!userData ? <Navigate to="/" /> : <PatientsAppointment />}
        />
        <Route
          path="/book-appointment"
          element={!userData ? <Navigate to="/" /> : <BookAppointment />}
        />
        <Route
          path="/patient-profile"
          element={!userData ? <Navigate to="/" /> : <PatientProfile />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/solutions" element={<Solutions />} />
      </Routes>
    </>
  );
}

export default App;
