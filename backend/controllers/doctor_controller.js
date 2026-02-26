const Doctor = require("../models/doctor_model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const doctorSignUp = async (req, res) => {
    try {
        const { name, email, password, phone, address, city, state, pincode, specialization, experience, education, image, hospitalId } = req.body
        const doctor = await Doctor.findOne({ email: email })
        if (doctor) {
            return res.status(400).json({ message: "Doctor already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({ name, email, password: hashPassword, phone, address, city, state, pincode, specialization, experience, education, image, hospitalId })
        await newDoctor.save()
        const token = jwt.sign({ userId: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 * 7
        })
        return res.status(201).json({ message: "Doctor created successfully", data: newDoctor })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const doctorSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email: email })
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, doctor.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 * 7
        })
        return res.status(200).json({ message: "Doctor signed in successfully", data: doctor })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const doctorSignOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Doctor signed out successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

module.exports = { doctorSignUp, doctorSignIn, doctorSignOut }