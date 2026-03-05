import { createSlice } from "@reduxjs/toolkit";
const HospitalSlice = createSlice({
    name: "hospital",
    initialState: {
        hospitalData: null,
    },
    reducers: {
        setHospitalData: (state, action) => {
            state.hospitalData = action.payload;
        },
        clearHospitalData: (state) => {
            state.hospitalData = null;
        },
    },
})

export const { setHospitalData, clearHospitalData } = HospitalSlice.actions;
export default HospitalSlice.reducer;