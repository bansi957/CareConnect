const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const patientSignup = async (req, res) => {
  try {
    const { fullName, email, password, phone, address, city, state, pincode } =
      req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      phone,
      address,
      city,
      state,
      pincode,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const p = await bcrypt.compare(password, user.password);
    if (!p) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User logged in successfully",user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const patientLogout=async(req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"User logged out successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}

const getCurrentPatient=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"User found successfully",user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports = { patientSignup, patientLogin,patientLogout,getCurrentPatient };
