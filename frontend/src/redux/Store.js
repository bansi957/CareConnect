import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import hospitalReducer from "./HospitalSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        hospital: hospitalReducer,
    }
})  