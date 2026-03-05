import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/UserSlice'
function useGetCurrentHospital() {
    const dispatch=useDispatch()
  useEffect(() => {
    const getCurrentPatient=async()=>{
        try {
            const response=await axios.get(`${serverUrl}/api/hospital/hospital-by-id`,{
                withCredentials:true
            })
            console.log(response.data)
            dispatch(setUserData(response.data.data))
        } catch (error) {
            console.log(error.response.data)
        }
    }
    getCurrentPatient()
  }, [])
}

export default useGetCurrentHospital