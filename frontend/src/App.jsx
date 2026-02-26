
import './App.css'
import Landingpage from './pages/Landingpage'
import PatientSignUp from './pages/PatientSignUp' 
import HospitalSignUp from './pages/HospitalSignUp'
  import { Routes, Route } from 'react-router-dom'
  export const serverUrl="http://localhost:3000"
function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Landingpage />} />
    <Route path="/patient-signup" element={<PatientSignUp />} />
        <Route path="/hospital-signup" element={<HospitalSignUp />} />

    </Routes>
    </>
  );
}

export default App;
