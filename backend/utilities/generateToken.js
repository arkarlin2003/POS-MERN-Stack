import jwt from "jsonwebtoken";
export const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "30d",
    }
  );
  res.cookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: "strict",
    maxAge: 30 * 40 * 60 * 60 * 100, //30days
  });
  return token;
};
