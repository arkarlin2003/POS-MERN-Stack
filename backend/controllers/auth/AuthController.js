import asyncHandler from "express-async-handler";
import User from "./../../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utilities/generateToken.js";

// @desc create user
// @method POST/api/register
// @access private
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill fields." });
  }
  const duplicateUser = await User.findOne({ email });
  if (duplicateUser)
    return res.status(409).json({ message: "Email already registered!" });

  try {
    const hashPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPwd,
    });

    generateToken(user, res);

    res.status(201).json({
      message: `New user ${user.name} is registed`,
      info: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc user & set token
// @method POST/api/login
// @access private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill fields." });
  }
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    let token = generateToken(user, res);
    res.json({
      info: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _token: token,
      },
      message: "Login successful",
    });
  } else {
    res.status(404);
    throw new Error("not found user");
  }
});

// @desc user logout
// @method POST/api/logout
// @access private
const logout = asyncHandler(async (req, res) => {
  const jwt = req.cookies?.jwt;
  if (!jwt) return res.sendStatus(401);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV,
  });
  res.sendStatus(204);
});
export { register, login, logout };
