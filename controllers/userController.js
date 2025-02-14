import User from "../models/userSchema.js";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const maxage = 3 * 24 * 60 * 60 * 1000;

const createToken = (user, userid) => {
  return jwt.sign({ user, userid }, process.env.JWT_TOKEN, {
    expiresIn: maxage,
  });
};

const userRegister = async (req, res, next) => {
  try {
    const { userName, password, name, gender, dob, country } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }

    const verify = await User.findOne({ username: userName})

    if(verify){ return res.status(400).json({message: "User already exists"})}

    const user = await User.create({
      userName,
      password,
      name,
      gender,
      dob,
      country,
    });

    res.cookie("jwt", createToken(userName, user.id), { maxage });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const pass = await compare(password, user.password);

    if (!pass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.cookie("jwt", createToken(userName, user.id), { maxage });

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

const userSearch = async (req, res, next) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ message: "Please provide username" });
    }
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error.message);
  }
};

export { userRegister, userSearch };
export default userLogin;
