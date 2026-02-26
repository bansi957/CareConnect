const Hospital = require("../models/hospital_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hospitalSignUp = async (req, res) => {
    try {
        const { name, email, mobile, password, address, city, state, pincode, hospitalCategory, registrationNumber } = req.body
        const hospital = await Hospital.findOne({ email: email })
        if (hospital) {
            return res.status(400).json({ message: "Hospital already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newHospital = new Hospital({ name, email, mobile, password: hashPassword, address, city, state, pincode, hospitalCategory, registrationNumber })
        await newHospital.save()
        const token = jwt.sign({ userId: newHospital._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 * 7
        })
        return res.status(201).json({ message: "Hospital created successfully", data: newHospital })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const hospitalSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const hospital = await Hospital.findOne({ email: email })
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, hospital.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ userId: hospital._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 * 7
        })
        return res.status(200).json({ message: "Hospital signed in successfully", data: hospital })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const hospitalSignOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Hospital signed out successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { hospitalSignUp, hospitalSignIn, hospitalSignOut }