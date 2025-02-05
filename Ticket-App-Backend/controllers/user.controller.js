import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields.", status: false });
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields.", status: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    const payload = {
      userID: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    if (isMatch) {
      res
        .status(200)
        .json({
          message: "User logged in successfully",
          status: true,
          user,
          Token: token,
        });
    } else {
      res.status(401).json({ message: "Invalid credentials", status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
