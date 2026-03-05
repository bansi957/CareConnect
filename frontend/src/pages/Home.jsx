import React from 'react'
import PatientHome from '../components/PatientHome'
import { useSelector } from 'react-redux'
import HospitalDashboard from './HospitalDashboard'

function Home() {
    const {userData}=useSelector((state)=>state.user)
    
  return (
    <>
    {userData?.role=="patient" && <PatientHome/>}
    {userData?.role=="doctor" && <DoctorHome/>}
    {userData?.role=="hospital" && <HospitalDashboard/>}
    </>
  )
}

export default Home