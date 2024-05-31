import env from "dotenv";
import mongoose from "mongoose";
import Color from "colors";
import connectToDB from "./db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import users from "../constants/users.js";
import products from "../constants/products.js";

env.config();
connectToDB();

export const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const setProducts = products.map((product) => {
      return { ...product, user: createdUsers[0] };
    });
    await Product.insertMany(setProducts);
    console.log(`Added Users`.green.inverse);
    console.log(`Added Products`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit();
  }
};

export const destoryData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();
    console.log(`Clean Database`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red.inverse);
    process.exit();
  }
};

mongoose.connection.once("open", async () => {
  console.log("Database was connected!".green.inverse);
  if (process.argv[2] === "-d") {
    await destoryData();
  } else {
    await importData();
  }
});
