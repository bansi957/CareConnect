import React from 'react'
import PatientHome from '../components/PatientHome'
import { useSelector } from 'react-redux'

function Home() {
    const {userData}=useSelector((state)=>state.user)
    
  return (
    <>
    {userData?.role=="patient" && <PatientHome/>}
    {/* {userData?.role=="Doctor" && <DoctorHome/>}
    {userData?.role=="Hospital" && <HospitalHome/>} */}
    </>
  )
}

export default Home