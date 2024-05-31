import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const authenticate = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = auth.split(" ")[1];
  if (token) {
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, encoded) => {
        if (err) {
          res.status(403);
          throw new Error("Authorization");
        }
        req.user = encoded;
        next();
      });
    } catch (error) {
      throw new Error(error);
    }
  }
});
