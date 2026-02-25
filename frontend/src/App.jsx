
import './App.css'
import Landingpage from './pages/Landingpage'
import PatientSignUp from './pages/PatientSignUp'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Landingpage />} />
    <Route path="/patient-signup" element={<PatientSignUp />} />
    </Routes>
    </>
  )
}

export default App
