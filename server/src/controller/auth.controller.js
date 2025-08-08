import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/jwt.service.js";

// Register Conroller
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    //   Check User
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({ message: "Email already Registered" });

    //   Hash password
    const hashPassword = bcrypt.hashSync(password, 12);

    //   Create User
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    //   Generate Token and Set cookie
    const token = generateToken({ id: newUser._id });
    res.cookie("token", token);

    res.status(201).json({ message: "User Registered sucessfully.", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //   Check User
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User Not Found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect Email or Password." });

    //   Generate Token
    const token = generateToken({ id: user._id });

    // Set Cookie
    res.cookie("token", token);

    res.status(200).json({ message: "User Logged In Sucessfully." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};
